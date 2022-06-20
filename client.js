sendEmail = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    const data = {
        email: this.state.email
    }

    fetch('http://localhost:8001/sendEmail',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(json => {
      //코드 계속 작성
    })
}
