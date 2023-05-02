export default function VerificaToken(error) {
    if (error.response) {
        if(error.response.status == 403){
            localStorage.setItem("erro", "y")
            window.location.href = '/'
        }
    }
}


