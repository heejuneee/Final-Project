# Final-Project
온라인 오디션 웹사이트

>Show Yout Talent

코로나바이러스가 생기기 이전에 대부분의 엔터테인먼트 기획사들은 회사에서 보는 센터 오디션 을 통해 연습생을 뽑았습니다. 그러나 코로나바이러스로 인해 공개 오디션이 없어지고 연기자,가 수를 지망하는 지원자들의 접근성이 많이 떨어졌다고 합니다.
이런 문제를 해결하기 위해 각 회사에서는 이메일로 오디션을 보는 방법을 택하였지만 정성을 들이지 않은 포트폴리오, 한사람당 여러번 보내는 무분별한 지원이 문제되면서 이메일 오디션 조 차도 없어지고 있다고합니다
그래서 이런 문제점을 해결하기 위해 언택트 시대에 맞춰 온라인 오디션 웹사이트를 계획하게 되었습니다. 지원자들은 웹사이트에서 회원가입 후 자신의지원분야(연기,랩/보컬 ,MC , 연주 , 모델)를 선택한 후 온라인으로 오디션을 지원할 수 있습니다.

## Skills
> Nodejs , Javascript , HTML CSS , Mysql

## 주요내용
<img width="459" alt="스크린샷 2022-06-27 오후 11 52 44" src="https://user-images.githubusercontent.com/107246410/175970429-015f66c8-a4f2-4c8e-b346-a69630fdddb3.png">


##DB테이블 
<img width="428" alt="스크린샷 2022-06-27 오후 11 55 54" src="https://user-images.githubusercontent.com/107246410/175970952-805f8d27-7960-42d3-abd5-35674ef398d7.png">

<img width="429" alt="스크린샷 2022-06-27 오후 11 56 44" src="https://user-images.githubusercontent.com/107246410/175971079-115415ba-6abe-4de0-aed7-9f4f3047327f.png">

<img width="427" alt="스크린샷 2022-06-27 오후 11 57 37" src="https://user-images.githubusercontent.com/107246410/175971217-73de8043-6ec6-49a2-bcfc-1e37579eccd7.png">




## 실행화면

<img width="702" alt="스크린샷 2022-06-27 오후 11 59 27" src="https://user-images.githubusercontent.com/107246410/175971967-c23003c9-2cc7-4a7f-a60a-3454a4b09115.png">

<img width="702" alt="스크린샷 2022-06-27 오후 11 59 38" src="https://user-images.githubusercontent.com/107246410/175972128-57bbc500-911c-4aeb-9215-d7cea7bcc457.png">

<img width="306" alt="스크린샷 2022-06-27 오후 11 59 52" src="https://user-images.githubusercontent.com/107246410/175972241-43c206d8-68f6-44a8-b4dd-f853eca141bc.png">


## Nodemailer를 통해 메일 전송코드
```js
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

```
##웹 크롤링
```js

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://www.auditionhub.me/ko/");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.headline-list ul").children("li.section02");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('strong.news-tl a').text(),
          url: $(this).find('strong.news-tl a').attr('href'),
          image_url: $(this).find('p.poto a img').attr('src'),
          image_alt: $(this).find('p.poto a img').attr('alt'),
          summary: $(this).find('p.lead').text().slice(0, -11),
          date: $(this).find('span.p-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
```
