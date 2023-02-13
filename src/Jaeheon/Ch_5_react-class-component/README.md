# 05장 리액트 클래스 컴포넌트

## 생명주기 메서드

1. 컴포넌트가 마운트 될 때

   ### constructor

   - 컴포넌트가 생성될 때 호출되는 메서드
   - 상태를 초기화하는데 사용
   - TS에서는 any타입을 사용해야 해서 권장X

   ### render

   - 컴포넌트를 가상 DOM으로 렌더링하는 메서드
   - 상태와 속성이 변경되지 않았다면 같은 결과를 반환

   ### componentDidMount

   - 컴포넌트의 마운트가 완료되고 브라우저 DOM의 트리에까지 반영이 된 후 호출되는 메서드
   - 브라우저 DOM이 완성된 후 api 호출 같은 초기화 작업이 필요할 때 사용<br/><br/>

2. 컴포넌트가 마운트 될 때

   ### getSnapshotBeforeUpdate

   - 가상 DOM으로 쓰기 작업이 완료된 후 , 브라우저 DOM에 업데이트 되기 전에 호출되는 메서드
   - 변경 전의 DOM상태 정보를 획득하여 스냅샷 값으로 리턴해서 componentDidUpdate 메서드의 세번째 인자로 받아낼 떄 사용

   ### componentDidUpdate

   - 브라우저 DOM까지 업데이트가 완료된 후 호출되는 메서드
   - 컴포넌트가 없데이트되고 DOM을 변경하고자 할 때 사용
   - 현재와 이전의 속성과 상태를 비교하여 차이가 있으면 작업 수행

   ### shouldComponentUpdate

   - 렌더링 성능을 최적화 할 때 사용
   - 현재와 이전의 속성과 상태를 비교하여 다시 렌더링 할지를 결정
   - 리턴값은 true/false<br/><br/>

3. 컴포넌트가 언마운트 될 때

   ### componentWillUnmount

   - 컴포넌트가 언마운트 될 때 사용
   - 연결된 외부 리소스 혹은 이벤트가 있으면 이것을 이용하여 반드시 해제<br/><br/>

4. 컴포넌트 자신이 포함하고 있는 하위 컴포넌트 트리에서 js 에러가 발생했을 때

   ### getDerivedStateFromError

   - 컴포넌트 자신이 포함하고 있는 하위 컴포넌트 트리에서 js 에러가 발생했을 때 실행되는 메소드
   - fallback UI를 보여주고 에러 메세지를 잡아낼 수 있는 기능 제공
   - 에러 발생 시 상태 변경에 사용
   - 컴포넌트 자신, 비동기 처리 코드, 서버 사이드 렌더링에서 일어나는 에러는 잡지 못함

   ### componentDidCatch

   - 컴포넌트 자신이 포함하고 있는 하위 컴포넌트 트리에서 js 에러가 발생했을 때 실행되는 메소드
   - fallback UI를 보여주고 에러 메세지를 잡아낼 수 있는 기능 제공
   - 에러 로깅, 서버로의 전송 등의 작업 수행
   - 컴포넌트 자신, 비동기 처리 코드, 서버 사이드 렌더링에서 일어나는 에러는 잡지 못함

<br/>
<hr/>

## 가상 DOM과 브라우저 DOM

### 가상 DOM

- 브라우저 DOM의 트리 구조를 그대로 브라우저 메모리상에 구현한 DOM 트리 객체
- 가상 DOM 수준에서 이전 버전과 현재 버전의 DOM 트리를 비교해서 차이가 나는 부분만을 브라우저 DOM에 업데이트 하기 때문에 브라우저 DOM에서의 불필요한 reflow, repaint를 줄임 -> 따라서 빠름
<br/><br/>
<hr/>

## App1(간단한 디지털 시계)

- componentDidMount, componentWillUnmount 생명주기 메서드 사용
- Mount될 때 setInterval 함수 호출
- unMount될 때 등록된 setInterval 함수 해제

## App2(간단한 채팅 앱)

- getSnapshotBeforeUpdate, componentDidUpdate, componentDidCatch, getDerivedStateFromError 생명주기 메서드 사용
- getSnapshotBeforeUpdate에서 리스트 상태 비교 후 `<div>` 요소의 높이를 반환
- 반환된 값은 componentDidUpdate의 3번째 인자인 snapshot으로 전달
- componentDidUpdate에서는 전달 받은 값을 통해 콘텐츠의 마지막으로 스크롤이 되도록 함
- 에러 발생 시 getDerivedStateFromError가 실행되어 hasError 상태 변경
- getDerivedStateFromError 실행 후 componentDidCatch 실행
- 에러 발생 시 에러 UI 렌더

## AppContainer(간단한 TodoList)

- shouldComponentUpdate 생명주기 메서드 사용하여 렌더링 최적화 적용
- todoListItem들이 다시 렌더링 되지 않음
- shouldComponentUpdate를 사용하지 않고 Component 대신 PureComponent를 상속 받아 최적화도 가능
- PureComponent는 shouldComponentUpdate 메서드가 상태와 속성을 얕은 비교를 하도록 구현된 클래스로 표현 컴포넌트에서 사용하기 적합
