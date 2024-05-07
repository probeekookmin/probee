import axios from "axios";

export const getAllMissingPerson = async (pageNum) => {
  console.log(pageNum);
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people?page=${pageNum}&size=50&criteria=createdAt`,
      {},

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

/*의뢰인용 메인 - 실종자 정보 (Get) */
export const getGuardianMissingPerson = async (id) => {
  console.log("실종자 id:", id);
  const data = axios
    .get(
      // `${process.env.REACT_APP_API_ROOT}/api/guardian/${id}`,
      // 테스트용
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log("response:", response.data);
      return response.data.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("정보 불러오기 실패.");
    });
  return data;
};

/*의뢰인용 메인 - 진행현황 (Get) */
export const getGuardianMissingPersonStep = async (id) => {
  console.log("실종자 id:", id);
  const data = axios
    .get(
      // `${process.env.REACT_APP_API_ROOT}/api/guardian/${id}`,
      // 테스트용
      `${process.env.REACT_APP_API_ROOT}/api/guardian/${id}/step`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log("response:", response.data);
      return response.data.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("정보 불러오기 실패.");
    });
  return data;
};

/*실종자 프로필 이미지 업로드 (Post)*/
export const postProfileImg = async (value) => {
  console.log("업로드 이미지", value.id, value.profile);
  const data = axios
    .post(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/${value.id}/profile`,
      {
        profile: value.profile,
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
