import { useState } from 'react'
import axios from 'axios'
// import CustomInput from 'Input.component/Input.jsx'


const ImageUpload = () => {
    
    const [fileData, setFileData] = useState()
        const [images, setImages] = useState()
    
        const handleFileChange = (e) => {
            setFileData(e.target.files[0])
            setImages(e.target.value)
        }
    
        const handleSubmit = async (e) => {
            try {
                e.preventDefault()
        
                const formdata = new FormData()
        
                formdata.append("image", fileData)
        
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/image`, formdata)
                console.log(response);
    
            } catch(error) {
                console.log(error);
            }
        }
    
    return (
        <div>
            <input type="file"
                         value={images}
                         name="file"
                         accept="images/*"
                         onChange={handleFileChange}
                         placeholder="upload image"
                         isRequired={true}

            />
        </div>
    )
}

export default ImageUpload