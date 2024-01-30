import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { Input } from '@mui/base';


const FileUpload = () => {
  //
  const [files, setFiles] = useState([])
  const [fileUrlList,setFileUrlList] = useState([])
  // console.log(files[0]);

  // 받아온 파일 데이터 보관, 미리보기 보여줌
  const selectFiles = (e) => {
    setFiles(Array.from(e.target.files))
    // setFiles([...files, e.target.files])


    const reader = new FileReader()
    reader.onload = (e) => {
      setFileUrlList([...fileUrlList, e.target.result])
    }
    reader.readAsDataURL(e.target.files[0])
    
    // for (let i = 0; i < e.target.files.length; i++) {
    //   reader.readAsDataURL(e.target.files[0][i])
    // }
  }


  // 서버로 전송
  const uploadFile = (e) => {
    console.log(e.target)
    e.preventDefault()
    // e.persist()
    const formData = new FormData()
    // formData.append('file', files)
    files.map((file) => {
      formData.append("file", file)
    })
    console.log(Array.from(formData))

    // if (files) {
    //   files.map((file) => {
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //       setFileUrlList(...fileUrlList, e.target.files[0])
    //       // fileUrlList.push(e.target.result)
    //     }
    //     reader.readAsDataURL(file)
    //   })
    // }

    axios.post(`url`, formData, {
      headers : {
        'Content-Type': 'multipart/form-data'
      },
      data : {
        data : formData
      }
      })
      . then((res) => {
        console.log(res.data)
      }) 
      .catch((err) => console.log(err))
  }


  return (
    <div>
      <Box sx={{display:'flex', width:'80%', border:1, borderColor:'black'}}>
        {/* <Input
        type='file'
        onChange={selectFiles}
        accept='.png, .jpg,image/*'
        // style={{display:'none'}}
        /> */}
        <input 
          type="file" 
          onChange={selectFiles}
          accept='.png, .jpg,image/*'
          multiple
        />
        <Button 
        onClick={uploadFile}
        sx={{justifySelf:'left f'}}
        >Upload</Button>
      </Box>

      {fileUrlList.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Preview ${index}`} />
          <p>{url}</p>
        </div>
      ))}
    </div>
  );
};

export default FileUpload;