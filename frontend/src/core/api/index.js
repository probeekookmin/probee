import axios from "axios";
import { getCookie } from "../cookie";

/*실종정보 등록 (Post)*/
export const postMissingPerson = async (values) => {
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

/*실종자 현황 (Get)*/
export const getAllMissingPerson = async (pageNum) => {
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people?page=${pageNum}&size=10`,
      {},

      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log("getData:::", response.data);
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
export const getGuardianMissingPerson = async () => {
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/guardian`,

      {
        headers: {
          Authorization: `${getCookie("authToken")}`,
          "Content-Type": "application/json",
        },
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
export const getGuardianMissingPersonStep = async () => {
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/guardian/step`,

      {
        headers: {
          Authorization: `${getCookie("authToken")}`,
          "Content-Type": "application/json",
        },
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
  const data = axios
    .post(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/profile`,
      value.profile,

      {
        headers: {
          Authorization: `${getCookie("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
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

export const getMissingPerson = async (id) => {
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log("getData:::", response.data);
      return response.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("등록 실패. 재시도해주세요.");
    });
  return data;
}
/*탐색 단계 가져오기 (실종자 리포트 화면)*/
export const getMissingPeopleStep = async (id) => {
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/step`,
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log("getData:::", response.data);
      return response.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("등록 실패. 재시도해주세요.");
    });
  return data;
}
/* 지능형 탐색 기록 리스트 가져오기*/ 
export const getSearchHistoryList = async (id) => {
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/search-history`,
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log("getData:::", response.data);
      return response.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("등록 실패. 재시도해주세요.");
    });
  return data;
}

/* 지능형 탐색결과 사진 가져오기*/
export const getSearchResultImg = async (id,step,search_id) => {
  let url = `${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/search-history?`
  if(step) url += `step=${step}&`
  if(search_id) url += `search_id=${search_id}`
  const data = axios
    .get(
      url,
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
      console.log("getData:::", response.data);
      return response.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("등록 실패. 재시도해주세요.");
    });
  return data;
}
