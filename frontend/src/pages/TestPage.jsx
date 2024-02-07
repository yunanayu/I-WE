

// function AddChild({ setSpouseStatus }) {
//   const navigate = useNavigate();
//   const [childName, setChildName] = useState("");
//   const [pregnancyDate, setPregnancyDate] = useState("");
//   const [childGender, setChildGender] = useState("");
//   const [pregnancyStatus, setPregnancyStatus] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const setBabyList = useMemberStore(state => state.setBabyList)
//   const setUserNum = useMemberStore(state => state.setUserNum)
//   const setParentType = useMemberStore(state => state.setParentType)


//   const handleChildNameChange = (event) => {
//     setChildName(event.target.value);
//   };

//   const handlePregnancyDateChange = (date) => {
//     const formattedDate = dayjs(date.$d).format("YYYY-MM-DD");
//     setPregnancyDate(formattedDate);
//   };

//   const handleBirthDateChange = (date) => {
//     const formattedDate = dayjs(date.$d).format("YYYY-MM-DD");
//     setBirthDate(formattedDate);
//   };

//   const handleChildGenderChange = (event) => {
//     setChildGender(event.target.value);
//   };

//   const handlePregnancyStatusChange = (event) => {
//     setPregnancyStatus(event.target.value);
//   };
  
//   const handleAddChild = async () => {
//     const cookieString = document.cookie;
//     const cookies = cookieString.split('; ');

//     var code;
//     for (const cookie of cookies) {
//       const [cookieName, cookieValue] = cookie.split('=');
//       if (cookieName === 'token') {
//         code = cookieValue;
//       }
//     }

//     var userNum;
//     var parentType
//     // 사용자 정보 요청해서 Authorization에 넣기
//     try {
//       const response = await axios.get('/api/member',
//         {
//           headers: {
//             'Authorization' : code
//           }
//         }
//       );
//       userNum = response.data.num;
//       parentType = response.data.parentType;
//     } catch(e) {
//       console.log("회원정보 받아오기 실패")
//     }
//     // user type, pk 저장
//     setUserNum(userNum)
//     setParentType(parentType)
    
//     const requestBaby = {
//       motherNum: userNum, // 해당 유저의 num
//       name: childName,
//       gender: childGender === "MALE" ? 1 : childGender === "FEMALE" ? 2 : 0, // 남자=1 여자=2 모름=0
//       birth: new Date(birthDate), // 아이의 생일
//       pregnancyDate: new Date(pregnancyDate), // 임신 날짜
//       status: pregnancyStatus === "pregnancy" ? true : false, // 임신 상태인지 여부를 true 또는 false로 설정
//     };

//     var babyList = []
//     // 아기정보 post
//     try {
//       const response = await axios.post(`/api/baby`, requestBaby, // requestBaby 정보 전달
//       {
//           headers: {
//             'Authorization' : code
//           }
//         }
//       );
//       // console.log(response.data);
//       const babyInfo = response.data
//       babyList = response.data

//     } catch(e) {
//       console.log("아기정보 등록 실패")
//     }
//     setBabyList(...babyList)
//     console.log("아기정보 등록 성공")
//     navigate("/");
//   };

  
//   return (
//     <div>
//       <div>
//         <FormControl>
//           <FormLabel>현재 상태</FormLabel>
//           <RadioGroup
//             name="pregnancy-status"
//             value={pregnancyStatus}
//             onChange={handlePregnancyStatusChange}
//           >
//             <FormControlLabel value="pregnancy" control={<Radio />} label="임신" />
//             <FormControlLabel value="nonpragnancy" control={<Radio />} label="출산" />
//           </RadioGroup>
//         </FormControl>
//       </div>

//       {pregnancyStatus === "pregnancy" ? (
//         <>
//           <TextField
//             label="아이의 이름"
//             value={childName}
//             onChange={handleChildNameChange}
//           />
//           <FormControl>
//             <FormLabel>성별</FormLabel>
//             <RadioGroup
//               name="child-gender"
//               value={childGender}
//               onChange={handleChildGenderChange}
//             >
//               <FormControlLabel value="NONE" control={<Radio />} label="모름" />
//               <FormControlLabel value="MALE" control={<Radio />} label="남자" />
//               <FormControlLabel value="FEMALE" control={<Radio />} label="여자" />
//             </RadioGroup>
//           </FormControl>
//           <div>
//             <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
//               <DemoContainer components={['DatePicker']}>
//                 <DesktopDatePicker  
//                   label="임신 추측일 (마지막 생리 날짜)" 
//                   value={pregnancyDate}
//                   onChange={handlePregnancyDateChange}
//                   shouldDisableDate={(day) => {
//                     return dayjs(day).isAfter(dayjs(), 'day');
//                   }}/>
//               </DemoContainer>
//             </LocalizationProvider>
//           </div>
          
//         </>
//       ) : pregnancyStatus === "nonpragnancy" ? (
//         <>
//           <FormControl>
//             <FormLabel>성별</FormLabel>
//             <RadioGroup
//               name="child-gender"
//               value={childGender}
//               onChange={handleChildGenderChange}
//             >
//               <FormControlLabel value="MALE" control={<Radio />} label="남자" />
//               <FormControlLabel value="FEMALE" control={<Radio />} label="여자" />
//             </RadioGroup>
//           </FormControl>
//           <TextField
//             label="아이의 이름"
//             value={childName}
//             onChange={handleChildNameChange}
//           />
//           <div>
//             <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
//               <DemoContainer components={['DesktopDatePicker ']}>
//                 <DesktopDatePicker  
//                   label="출산일" 
//                   value={birthDate}
//                   onChange={handleBirthDateChange}
//                   shouldDisableDate={(day) => {
//                     return dayjs(day).isAfter(dayjs(), 'day');
//                   }}/>
//               </DemoContainer>
//             </LocalizationProvider>
//           </div>
//         </>
//       ) : null}

//       <Button variant="contained" onClick={handleAddChild}>아이 추가</Button>
//     </div>
//   );
// }

// export default AddChild;
