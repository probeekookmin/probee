import styled from "styled-components";
import { Input } from "antd";
const { Search } = Input;

export const SeacrchBox = () => {
  return (
    <StSeacrchBox>
      <SearchBox placeholder="도로명주소" readOnly={true} />
    </StSeacrchBox>
  );
};

const StSeacrchBox = styled.div``;
const SearchBox = styled(Search)`
  width: 25.1rem;
`;
