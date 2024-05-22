import { Typography } from "antd";
const { Text, Link, Paragraph } = Typography;

export const AnnotationData = [
  {
    category: "missingPerson",
    title: (
      <Typography>
        <Text strong>실종자의 성별</Text> 및 <Text strong>생년월일</Text>은{" "}
        <Text mark>행정 상의 주민등록번호를 기준</Text>으로 입력해주세요.
      </Typography>
    ),
  },
  {
    category: "missingPerson",
    title: (
      <Typography>
        실종 시간은 <Text strong>실종 추정 시각</Text>을 기준으로 입력해주세요.
      </Typography>
    ),
  },
  {
    category: "missingPerson",
    title: (
      <Typography>
        위 항목에 포함되지 않으나, 수색에 도움이 되는 추가 정보가 있다면 특이사항에 기재해주세요.
        <br /> 실종자의 장애 유무, 보유하고 있는 질환 등이 이에 해당됩니다.
      </Typography>
    ),
    content: (
      <Typography>
        <Paragraph>
          <ul>
            <li>실종자 유형 선택과는 별개로, 정확한 장애 분류 혹은 질환명을 작성해주세요.</li>
            <li>해당 항목은 사람의 개입이 있는 이미지 선별 과정 및 실제 수색 단계에서 참고하기 위함입니다.</li>
          </ul>
        </Paragraph>
      </Typography>
    ),
  },
  {
    category: "missingPerson",
    title: (
      <Typography>
        <Text strong>실종자 유형</Text>은 <Text mark>나이를 최우선으로</Text> 선택해주시길 바랍니다.
      </Typography>
    ),
    content: (
      <Typography>
        <Paragraph>
          <ul>
            <li>18세 미만의 장애인일 경우, 해당 실종자는 정상 아동으로 분류됩니다.</li>
            <li>
              지적·자폐성·정신장애인, 치매환자 등 실종 등록이 가능한 18세 이상의 성인은 모두 지적 장애인으로 분류됩니다.
            </li>
          </ul>
        </Paragraph>
      </Typography>
    ),
  },
  {
    category: "wearing",
    title: (
      <Typography>
        <Text strong>적합한 착장 색상이 없다면,</Text> <Text mark>최대한 가까운 색</Text>으로 선택해주세요.
      </Typography>
    ),
    content: (
      <Typography>
        <Paragraph>
          <ul>
            <li>ex) 하늘색, 청록색, 남색 → 파란색 선택</li>
          </ul>
        </Paragraph>
      </Typography>
    ),
  },
  {
    category: "guardian",
    title: (
      <Typography>보호자의 연락처는 1개만 기입이 가능하며, 해당 번호로 보호자용 페이지의 링크가 전송됩니다.</Typography>
    ),
    content: (
      <Typography>
        <Paragraph>
          <ul>
            <li>
              탐색 진행 과정에서 보호자의 참여가 필요하기 때문에, 가장 빠른 연락이 가능한 번호로 작성하는 것을
              권장합니다.
            </li>
          </ul>
        </Paragraph>
      </Typography>
    ),
  },
  {
    category: "intelligentSearch",
    title: (
      <Typography>
        지능형 탐색 초기 정보 등록이 완료되면, 해당 탐색이 완료되기 전까지는 정보 수정이 불가능합니다.
      </Typography>
    ),
  },
  {
    category: "intelligentSearch",
    title: <Typography>입력된 탐색 위치를 기준으로 반경 00m 구간의 탐색이 진행됩니다.</Typography>,
  },
];
