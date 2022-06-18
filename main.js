const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const nodemailer = require('nodemailer');
 const ejs = require('ejs');

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const { sequelize } = require('./models');
const passportConfig = require('./passport');
const { fstat } = require('fs');



dotenv.config();
passportConfig();

async function main() {
	
	var authNum = Math.floor(Math.random() * 1000000) + 100000;      //랜덤한 인증번호를 생성한다.
    if (authNum > 1000000) {
      authNum = authNum - 100000;
	}
    const transporter = nodemailer.createTransport({

          host : "smtp.naver.com"   

        , port : 465

        , secure : true                   
        , auth : {

              user : "primejune@naver.com"

            , pass : "hjnp82821201#"
        }

    });  
    // 발송할 메일의 컨테츠 정보
    let info = await transporter.sendMail({

          from : "primejune@naver.com"         // @details 보내는 사람 메일주소( user 메일주소와 일치해야함 )

        , to :    "primejune@naver.com"            // @details 받는이(들) 메일주소

        , subject : "SYT 인증번호 입니다. ✔"                           // @details 메일주소

        // , text : "HTML 속성이 활성화 되어 있으면 비활성화 됨"         // @details 메일 내용 
      

        , html :  "인증번호는 " + authNum + "입니다."            // @details 메일 내용(HTML)

    });



    console.log("Message sent : %s", info.messageId);

}


// @breif main() 함수를 실행

main().catch( console.error );



const app = express();

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  
  express: app,
  watch: true,
});

sequelize.sync({ force: false })

  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));




app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);


app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});




