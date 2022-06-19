// @breif nodemailer 모듈추출

const nodemailer = require( "nodemailer" );
// const { sequelize } = require('./models');



// @details 글로벌 범위에서 대기할 수 없으므로 래퍼( wrapper )를 사용해야 함

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

            , pass : "bravojunezzang1"

        }

    });



    // @breif 발송할 메일의 컨테츠 정보

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
