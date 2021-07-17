import axios from 'axios'

//создадим 2 instance

//1-ый, для обычных запрос, не требующих авторизации
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


//2-ый, для требующих авторизации, автоматически сопоставляет в поле headers, authorization
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
//для 2-го instance, нужно автоматически подставлять токен каждому запросу,
// для этого есть обычные ф-и interceptor принимающие в параметр config
const authInterceptor = config => {
    /*в поле headers добавляем поле authorization и указываем наш токен, к-е получать мы будем из локального хранилища
    по ключу токен, при авторизации мы будем добавлять в локальное хранилище */
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

//interceptor вешаем на запросы,будет отрабатывать
// при каждом запросе, автоматически подставлять токен поле authorization в headers
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}