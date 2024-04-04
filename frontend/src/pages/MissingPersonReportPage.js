import styled from "styled-components";
import { BasicInfo } from "../components/missingPersonReport/BasicInfo";

function MissingPersonReportPage() {
  return (
    <StMissingPersonReportPage>
      <BasicInfo />
    </StMissingPersonReportPage>
  );
}
export default MissingPersonReportPage;

const StMissingPersonReportPage = styled.div``;
