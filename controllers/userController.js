const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User, Basket} = require("./../models/models");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"});
};

class UserController {
    async registration(req, res, next) {
        //Если клиент отправил пустые пароль и логин то , показываем ошибку
        const {email, password, role} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или пароль"));
        }
        //проверяем, возможно с таким email уже кто то зарегистр
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(
                ApiError.badRequest("Пользователь с таким email уже существует")
            );
        }

        //если такого пол-я и email нет , то создаем его и перредаем захешированным паролям
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword});
        const basket = await Basket.create({userId: user.id});

        //формируем токен для отправки клиенту, пишем в payload id email и role = присвается по умолчанию user ,
        // 2-м параметром секретный ключ и 3-м сколько токен будет действителен
        const token = generateJwt(user.id, user.email, user.role);

        //и возвращаем токен клиенту
        return res.json({token});
    }

    //блок авторизации пользователя
    async login(req, res, next) {

        /*//дастаем из тела запроса email and password, делая деструктуризацию*/
        const {email, password} = req.body;
      /*  //ищем в базе данных юзера по email, если нету то выдаем ошибку*/
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal("Пользователь не найден"));
        }
       /* //синхронно сравниваем с паролям из базы данных, владельца и с паролям из запроса*/
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Указан не верный пароль"));
        }
        /*// если все хорошо, то направляем клиенту токен*/
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    //блок на проверка на авториз-ию юзера, путем генирации нового токена и отправки его на клиент
    //если юзер постоянно ипользует свой аккаунт токен постоянно будет перезаписываться
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({token}); //возвращаем сгенированный токен на клиент
    }

}

module.exports = new UserController();
