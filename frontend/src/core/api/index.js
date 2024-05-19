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
export const getAllMissingPerson = async (pageNum, filter, search) => {
  console.log("props", pageNum, filter, search);
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people?page=${pageNum}${filter ? `&status=${filter}` : ""}${search ? `&name=${search}` : ""}`,
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

/*리포트 화면 실종자 정보 가져오기*/
export const getMissingPerson = async (id) => {
  const data = axios
    .get(`${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
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

/*탐색 단계 가져오기 (실종자 리포트 화면)*/
export const getMissingPeopleStep = async (id) => {
  console.log("getMissingPeopleStep", id);
  const data = axios
    .get(`${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/step`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
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

/* 지능형 탐색 기록 리스트 가져오기*/
export const getSearchHistoryList = async (id) => {
  console.log("getSearchHistoryList", id);
  const data = axios
    .get(`${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/search-history`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
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

/* 지능형 탐색결과 사진 가져오기 -1차,2차 탐색 (Get)*/
export const getSearchResultImg = async (page, id, step, search_id) => {
  console.log("getSearchResultImg", id, step, search_id);

  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/search-result?page=${page}&size=6${step ? `&step=${step}` : ""}${search_id ? `&search-id=${search_id}` : ""}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    )
    .then(function (response) {
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

/* 이미지 선별 결과 가져오기 (Get)*/
export const getBetweenResultImg = async (page, id) => {
  const data = axios
    .get(`${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/between-result?page=${page}&size=6`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
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

/* 탐색 결과에 대한 cctv 위치 (Get)*/
export const getCCTVResult = async (id, step) => {
  const data = axios
    .get(`${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/mapposition?step=${step}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (e) {
      // 실패 시 처리
      console.error(e);
      console.log(e.response.data);
      alert("cctv 위치 가져오기 실패. 재시도해주세요.");
    });
  return data;
};

/*실종자 리포트 - 지능형 탐색 추가 (Post) */
export const postIntelligentSearch = async (id, values) => {
  const data = axios
    .post(
      `${process.env.REACT_APP_API_ROOT}/api/missing-people/${id}/search`,
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
      alert("탐색 실패. 재시도해주세요.");
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

/*의뢰인용 이미지 선별 - 1차 탐색 이미지 (Get) */
export const getGuardianSelectImage = async () => {
  const data = axios
    .get(
      `${process.env.REACT_APP_API_ROOT}/api/guardian/between`,

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

/*의뢰인용 이미지 선별 - 선별 이미지 (Post)*/
export const postGuardianSelectImage = async (value) => {
  const data = axios
    .post(
      `${process.env.REACT_APP_API_ROOT}/api/guardian/between`,
      { resultIds: value[0] },
      {
        headers: {
          Authorization: `${getCookie("authToken")}`,
          "Content-Type": "application/json",
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
