const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //если метод OPTIONS, то авторизован, все ф-ии доступны
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    //забираем token из headers так как есть тип Bearer то делаем пробел и забираем через 1 индекс
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    //если есть токен то проверяем его с нашим ключом к-е сохранили в окр перем
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    //добавим данные в поле User
    req.user = decoded;
    // этот User будет доступен во всех ф-ях
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
