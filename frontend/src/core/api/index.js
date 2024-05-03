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
