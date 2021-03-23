import Github from '../../images/github.png'
import Linkedin from '../../images/linkedin.png'

const Contact = () => {


    return (
    
        <div className="contact-container"> 
            <div class="contact-inner-container">    
                <div className="henry">
                    <a href="https://github.com/henry-mcdonald" target= "_blank"><img id="github-logo" src={Github} alt="github-logo" /></a>
                    {/* {henry do you have a linkedin URL?} */}
                    <a href="https://www.linkedin.com/in/henry-mcdonald-b426a5a0/" target= "_blank"><img id="linkedin-logo" src={Linkedin} alt="linkedin-logo" /></a>
                    <h1> Henry McDonald</h1>
                </div>

                <div className="david">
                    <a href="https://github.com/dlashinsky" target= "_blank"><img id="github-logo" src={Github} alt="github-logo" /></a>
                    <a href="https://www.linkedin.com/in/dlashinsky/" target= "_blank"><img id="linkedin-logo" src={Linkedin} alt="linkedin-logo" /></a>
                    <h1> David Lashinsky</h1>
                </div>

                <div className="justin">
                    <a href="https://github.com/soobinkiki" target= "_blank"><img id="github-logo" src={Github} alt="github-logo" /></a>
                    <a href="https://www.linkedin.com/in/justin-park-4b20b8206/" target= "_blank"><img id="linkedin-logo" src={Linkedin} alt="linkedin-logo" /></a>
                    <h1> Justin Park</h1>
                </div>
            </div>
        </div>
     
    )
}

export default Contact