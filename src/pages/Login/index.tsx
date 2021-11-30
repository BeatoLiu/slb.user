import React, { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-vant";

import { pwdLogin } from "@/apis/login";
import { checkPhone, checkPassWord } from '@/utils'

import logoImg from "@/assets/img/logo.png";
import userImg from "@/assets/img/icon/user.png";
import clearImg from "@/assets/img/icon/clear.png";
import keyImg from "@/assets/img/icon/key.png";
import eyeOpenImg from "@/assets/img/icon/eye_open.png";
import eyeCloseImg from "@/assets/img/icon/eye_close.png";
import "./index.less";

export default function Login() {
    let location = useLocation();
    let navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(true);

    let from = location.state?.from?.pathname || "/";
    const login = () => {
        if (checkPhone(phone) && checkPassWord(password)) {

            pwdLogin({ memMobile: phone, memPassword: password }).then((res) => {
                if (res.resultCode === 1) {
                    let arr = res.data.memMobile.split("|");
                    localStorage.memMobile = arr[0] + "****" + arr[2];
                    localStorage.token = res.data.token
                    localStorage.memCode = res.data.memCode
                    localStorage.memName = res.data.memName;
                    navigate(from, { replace: true });
                }
            });
        }
    };
    const toSign = (path: string) => {
        navigate(path);
    };
    return (
        <div className="login">
            <div className="login-cont">
                <div className="img-wrapper">
                    <img src={logoImg} alt="" />
                </div>
                <div className="item">
                    <div className="img-wrapp">
                        <img src={userImg} alt="" className="user-img" />
                    </div>
                    <input
                        type="number"
                        pattern="[0-9]*"
                        placeholder="请输入手机号"
                        value={phone}
                        onChange={(event: ChangeEvent) =>
                            setPhone((event.target as HTMLTextAreaElement).value)
                        }
                    />
                    <img
                        src={clearImg}
                        alt=""
                        className="clear"
                        onClick={() => setPhone("")}
                    />
                </div>
                <div className="item">
                    <div className="img-wrapp">
                        <img src={keyImg} alt="" className="user-img" />
                    </div>
                    <input
                        type={showPw ? "password" : "text"}
                        placeholder="请输入密码"
                        value={password}
                        onChange={(event: ChangeEvent) =>
                            setPassword((event.target as HTMLTextAreaElement).value)
                        }
                    />
                    <img
                        src={showPw ? eyeCloseImg : eyeOpenImg}
                        alt=""
                        className="clear"
                        onClick={() => setShowPw(!showPw)}
                    />
                </div>
                <Button className="btn" onClick={login}>
                    立即登录
                </Button>
                <p onClick={() => toSign("/resetPWD")}>忘记密码</p>
                <div className="sign">
                    还没账号？<span onClick={() => toSign("/register")}>立即注册</span>
                </div>
            </div>
        </div>
    );
}
