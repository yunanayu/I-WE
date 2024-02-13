import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { Input } from '@mui/base';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUpload = () => {
  const [files, setFiles] = useState([])
  const [fileUrlList,setFileUrlList] = useState([])

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
        data : formData,
        
      }
      })
      . then((res) => {
        console.log(res.data)
      }) 
      .catch((err) => console.log(err))
  }


  return (
    <div>
      <Box sx={{display:'flex', width:'80%',}}>
        {/* <Input
        type='file'
        onChange={selectFiles}
        accept='.png, .jpg,image/*'
        // style={{display:'none'}}
        /> */}

        {/* <input 
          type="file" 
          onChange={selectFiles}
          accept='.png, .jpg,image/*'
          multiple
        />
        <Button 
        onClick={uploadFile}
        sx={{justifySelf:'left'}}
        >Upload</Button> */}
      <Button onChange={selectFiles} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        사진 등록하기
        <VisuallyHiddenInput type="file" />
      </Button>      

      {fileUrlList.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Preview ${index}`} style={{width:'100px'}}/>
          {/* <p>{url}</p> */}
        </div>
      ))}
      </Box>

    </div>
  );
};

export default FileUpload;