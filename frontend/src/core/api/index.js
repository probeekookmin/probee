import axios from "axios";

// "missingPeopleName": "실종자 이름",
// "birthdate" : "2000-01-01",
// "gender" : "성인 남성",
// "missingAt" : "2024-01-01T01:01:01",
// "missingLocation" : "실종위치",
// "description" : "특이사항",
// "hairStyle" : "긴 머리",
// "topType" : "반팔",
// "topColor" : "빨강",
// "bottomType" : "반바지",
// "bottomColor" : "빨강",
// "bagType" : "백팩",
// "shoesColor" : "빨강",
// "guardianName" : "보호자 이름",
// "relationship" : "실종자와의 관계",
// "phoneNumber" : "010-1111-1111",
// "startTime" : "2024-01-01T01:01:01",
// "endTime" : "2024-02-01T02:02:02",
// "latitude" : 11.1111,
// "longitude" : 11.1111,
// "locationAddress" : "도로명 주소"

export const postMissingPerson = async (
  //   missingPeopleName,
  //   birthdate,
  //   gender,
  //   missingAt,
  //   missingLocation,
  //   description,
  //   hairStyle,
  //   topType,
  //   topColor,
  //   bottomType,
  //   bottomColor,
  //   bagType,
  //   guardianName,
  //   relationship,
  //   phoneNumber,
  //   startTime,
  //   endTime,
  //   latitude,
  //   longitude,
  //   locationAddress,
  //   shoesColor,
  values,
) => {
  console.log("values", values);
  const data = axios
    .post(
      `https://probee.co.kr/api/missing-people`,

      {
        ...values,
        // missingPeopleName: values.missingPeopleName,
        // birthdate: values.birthdate,
        // gender: values.gender,
        // missingAt: values.missingAt,
        // missingLocation: values.missingLocation,
        // description: values.description,
        // hairStyle: values.hairStyle,
        // topType: values.topType,
        // topColor: values.topColor,
        // bottomType: values.bottomType,
        // bottomColor: values.bottomColor,
        // bagType: values.bagType,
        // guardianName: values.guardianName,
        // relationship: values.relationship,
        // phoneNumber: values.phoneNumber,
        // startTime: values.startTime,
        // endTime: values.endTime,
        // latitude: values.latitude,
        // longitude: values.longitude,
        // locationAddress: values.locationAddress,
        // shoesColor: values.shoesColor,
        // missingPeopleName: "실종자 이름",
        // birthdate: "2000-01-01",
        // gender: "성인 남성",
        // missingAt: "2024-01-01T01:01:01",
        // missingLocation: "실종위치",
        // description: "특이사항",
        // hairStyle: "긴 머리",
        // topType: "반팔",
        // topColor: "빨강",
        // bottomType: "반바지",
        // bottomColor: "빨강",
        // bagType: "백팩",
        // shoesColor: "빨강",
        // guardianName: "보호자 이름",
        // relationship: "실종자와의 관계",
        // phoneNumber: "010-1111-1111",
        // startTime: "2024-01-01T01:01:01",
        // endTime: "2024-02-01T02:02:02",
        // latitude: 11.1111,
        // longitude: 11.1111,
        // locationAddress: "도로명 주소",
      },

      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log(response.data);
      //   return response.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("등록 실패. 재시도해주세요.");
    });
  return data;
};
