# 9장 리액트 라우터

## 리액트 라우터

리액트 기반의 강력한 라우팅 라이브러리로 화면에 렌더링하는 컴포넌트와 URI 경로를 동기화하면서 새로운 화면과 흐름을 애플리케이션에 빠르게 추가할 수 있는 기능을 제공하여 SPA를 손쉽게 작상 가능하다.

SPA는 하나의 HTML 페이지로 여러 개의 화면을 전환할 수 있는 내비게이션 기법으로 화면전환을 위해 서버로부터 새로운 페이지를 로딩 하지 않고 첫 화면을 로딩할 때 한꺼번에 서버에서 로딩한다.
<br /><br />

## 기본 사용법

```tsx
<Router>
  .....
  <Routes>
    <Route path="/home" element={<Home />} />
    .....
  </Routes>
</Router>
```

Router 컴포넌트에는 자식 컴포넌트로 URI 경로 정보를 처리하는 Routes, Route 컴포넌트를 배치할 수 있으며 라우팅하는 방법을 결정한다.

라우팅 방법은 BrowserRouter, HashRouter, MemoryRouter, NavigateRouter 등이 있다.

Routes 컴포넌트는 Route 컴포넌트들을 묶어서 배치하는 역할을 하며, Route 컴포넌트는 직접적으로 URI 경로와 렌더링할 컴포넌트나 요소를 지정하는 기능을 제공한다.

위 코드에서는 /home 경로로 요청했을 때 Home 컴포넌트를 렌더링한다.
<br /><br />

## URI 파라미터

```tsx
<Route path="/songs/:id" element={<SongDetail />} />;

type SongParamType = {
  id?: string;
};

const SongDetail = () => {
  const { id } = useParams<SongParamType>();
};
```

`<Route />`의 path에는 :id 와 같이 URI 경로의 파라미터 이름을 지정할 수 있다. 이 파라미터 값은 element로 렌더링하는 컴포넌트에서 받아낼 수 있다.

컴포넌트에서는 파라미터의 타입을 정의할 수 있다. id 파라미터가 전달되지 않는 경우를 처리하기 위해 ? 기호를 붙여 선택적으로 정의한다.

id값을 받아낼 때는 useParams 훅을 쓴다.

URI 파라미터는 여러 개 사용 가능하며 와일드 카드를 이용할 수도 있다.

- order/:id/:date
- /groups/\*
  <br /><br />

## 중첩 라우트

```tsx
<Route path="/songs" element={<SongList />} />
<Route path="/songs/:id" element={<SongDetail />} />
/*
    /songs로 요청: SongList 컴포넌트 렌더링
    /songs/:id로 요청: SongDetail 컴포넌트 렌더링
*/
```

```tsx
<Route path="/songs" element={<SongList />}>
  <Route path=":id" element={<Player />} />
</Route>
/*
    중첩 라우트 적용
    /songs로 요청: SongList 컴포넌트 렌더링
    /songs/:id로 요청: SongList, Player 컴포넌트 렌더링
*/

const SongList = () => {
    ....
    return (
        ....
        <Outlet />
    )
}
```

중첩 라우트(nested route)는 `<Route />` 컴포넌트에 의해 렌더링된 컴포넌트에 기존 Route 의 중첩된 `<Route />` 컴포넌트가 나타나도록 구성하는 `<Route />` 컴포넌트의 적용 방법이다.

추가로 중첩 라우트의 바깥쪽 `<Route />` 컴포넌트에 의해 렌더링되는 컴포넌트에는 중첩된 내부 `<Route />`에 의해 렌더링되는 컴포넌트를 담을 컨테이너로써 `<Outlet />` 컴포넌트를 작성해야 한다.

/songs/:id 경로 패턴에 매칭되면 Player 컴포넌트가 SongList 내부의 Outlet 컴포넌트에 렌더링 된다.
<br /><br />

## index 라우트 설정

중첩 라우트에서 상위 경로(부모 경로)까지만 매칭이 되는 경우에는 부모 경로의 `<Route />` 컴포넌트의 element만 렌더링 되었다. 하지만 index 라우트를 설정하면 부모 경로까지만 매칭되는 경우에도 자식 컴포넌트를 렌더링할 수 있다.

```tsx
<Route path="/parent" element={<Parent />}>
  <Route index element={<DefaultChild />} />
  <Route path=":param" element={<Child />} />
</Route>
```

위 예시는 요청 경로에 따라 다음과 같이 컴포넌트를 렌더링 한다.

- /parent로 요청: Parent, DefaultChild 컴포넌트 렌더링
- /parent/:param로 요청: Parent, Child 컴포넌트 렌더링
  <br /><br />

## 리액트 라우터가 제공하는 훅

1. useMatch

   ```tsx
   // 경로 패턴에는 <Route /> 컴포넌트의 path 속성에 지정한 경로 형태를 전달
   const pathMatch = useMatch(경로패턴);
   ```

   useMatch 훅은 현재 요청된 URI 경로가 인자로 전달한 경로 패턴과 매치하는지 확인하고 pathMatch 객체를 반환한다.

   pathMatch 객체는 다음과 같은 속성이 있다.

   - params: URI 경로 파라미터
   - pathname: 요청한 경로
   - pattern: 요청한 경로 패턴

2. useParams

   ```tsx
   const params = useParams();
   /*
        경로 패턴이 /songs/:id, 현재 경로가 /songs/1 이면
        params = {id: 1} 
   */
   ```

   useParams 훅은 URI 파라미터값을 포함하는 Params 객체를 반환한다.

3. useSearchParams

   ```tsx
   // searchParams: 쿼리 문자열을 읽을 수 있는 객체
   // ?a=1&b=2와 같이 요청한 경우 searchParams.get("a")와 같이 접근 가능
   // setSearchParams: 쿼리 문자열을 설정할 수 있는 기능을 제공하는 함수
   // setSearchParams({a:3, b:4})와 같이 설정 가능
   const [searchParams, setSearchParams] = useSearchParams();
   ```

   useSearchParams 훅은 요청 시 전달하는 쿼리 문자열 정보를 읽어내거나 설정하는 기능을 제공한다.

4. useNavigate

   ```tsx
   // to: 이동하려는 경로
   // options: 경로를 이동할 때 지정할 수 있는 옵션
   const navigate = useNavigate();
   navigate(to, option);
   ```

   useNavigate 훅을 호출하면 URI 경로를 이동할 수 있는 navigate 함수를 반환한다. 이 함수를 사용하여 다양한 방법으로 경로를 이동하고 화면을 전환할 수 있다.

   navigate 함수의 2번째 인자인 options에서 사용할 수 있는 속성

   - replace: 브라우저 히스토리의 현재 항목을 교채할 것인지를 true/false로 지정한다. 기본값은 false
   - state: 내비게이트할 때 전달할 상태 정보이다. 이 정보는 경로 이동이 완료된 후 location 객체의 state 속성을 이용해 접근할 수 있다.
     <br /><br />

   replace 옵션 설명

   - 브라우저 히스토리: /a -> /b -> /c -> /d (현재경로: /d)

   - navigate("/e", {replace: false})<br />
     브라우저 히스토리: /a -> /b -> /c -> /d -> /e

   - navigate("/e", {replace: true})<br />
   브라우저 히스토리: /a -> /b -> /c -> /e<br />
   <hr />

   ```tsx
   import { Navigate } from "react-router-dom"
   ....
   return(
       <div>
           {isLogin ? <App/> : <Navigate to="/login" replace={true}>}
       </div>
   )
   ```

   navigate 함수 대신 JSX 구문에 포함시켜 사용할 수 있는 `<Navigate />`컴포넌트도 있다.
   위 예시는 isLogin이 false면 /login 경로로 바로 이동시킨다.<hr />

   ```tsx
   import { Link } from "react-router-dom"
   ....
   return(
      <Link to="/home">Home</Link>
   )
   ```

   경로를 이동시키는 `<Link />` 컴포넌트도 있다. `<a>` 태그와 매우 유사하다. 위 예시는 Link 컴포넌트를 클릭하면 /home 경로로 이동한다.
   <br /><br />

5. useLocation

   ```tsx
   const location = useLocation();
   ```

   현재 요청된 경로 정보를 포함하는 Location 객체를 반환한다.

   location 객체가 제공하는 속성

   - pathname: 현재 요청된 경로
   - search: 쿼리 문자열
   - state: navigate()로 이동할 때 전달된 state 정보
     <br /><br />

6. useOutletContext

   ```tsx
    // 상위 라우트 컴포넌트에서 상태를 context로 전달
    const ParentComponent = () =>{
        const [title, setTitle] = useState<string>("Hello")
        .....
        return(
            .....
            <Outlet context={{ title: title }}/>
            .....
        )
    }

    // 중첩 라우트 컴포넌트에서 useOutletContext 훅으로 context 객체를 이용
    type ContextStateType = {title: string}
    const ChildComponent = () => {
        const { title } = useOutletContext()
        .....
    }
   ```

   useOutletContext 훅은 중첩된 라우트를 사용할 때 상위 경로의 `<Outlet />` 컴포넌트를 이용해 상태 정보를 저장해두고 하위 경로에서 접근할 수 있도록 하는 기능을 제공한다.

   사용 단계

   - 상위 라우트가 렌더링하는 컴포넌트에서 상태나 속성을 `<Outlet />` 컴포넌트의 context에 지정하여 전달한다.
   - 중첩 라우트의 자식 컴포넌트에서 useOutletContext 훅을 이용해 context 객체를 받아서 이용한다.
     <br /><br />

## App1

- 리액트 라우터를 사용한 뉴진스를 소개하는 간단한 앱
- URI 퍼러미터, 중첩 라우트, index 라우트 사용
- 리액트 라우터가 제공하는 useParams, useNavigate등의 훅들 사용
