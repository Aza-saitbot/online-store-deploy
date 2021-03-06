import React, {useContext, useState} from "react";
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utilits/consts";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {
        const {user} = useContext(Context)
        const location = useLocation()
        const history=useHistory()
        const isLogin = location.pathname === LOGIN_ROUTE
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const click = async () => {
           try{
               let data;
               if (isLogin) {
                   data = await login(email, password);
               } else {
                   data = await registration(email, password)
               }
               user.setUser(user)
               user.setIsAuth(true)
               history.push(SHOP_ROUTE)
           }catch (e) {
               console.log(e)
           }
        }

        return (
            <Container className="d-flex justify-content-center align-content-center"
                       style={{marginTop: "20vh"}}>
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin ?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            }
                            <Button
                                onClick={click}
                                className="mt-3 align-self-end"
                                variant={"outline-success"}
                            >
                                {isLogin ?
                                    "Войти" :
                                    "Регистрация"
                                }
                            </Button>
                        </Row>

                    </Form>
                </Card>
            </Container>
        )
    }
)

export default Auth;
