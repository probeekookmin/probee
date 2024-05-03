import axios from "axios";

/*실종정보 등록 (Post)*/
export const postMissingPerson = async (values) => {
  console.log("values", values);
  const data = axios
    .post(
      //   `${process.env.REACT_APP_API_ROOT}/api/missing-people`,
      // + 문자전송 및 연산 테스트
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/totalCreateTest`,
      {
        ...values,
      },

      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("등록 실패. 재시도해주세요.");
    });
  return data;
};
