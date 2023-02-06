# 9장 리액트 라우터

## 리액트 라우터

리액트 기반의 강력한 라우팅 라이브러리로 화면에 렌더링하는 컴포넌트와 URI 경로를 동기화하면서 새로운 화면과 흐름을 애플리케이션에 빠르게 추가할 수 있는 기능을 제공하여 SPA를 손쉽게 작성 가능하다.

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

## 라우터 관련 컴포넌트

1.  Router 컴포넌트

    BrowserRouter

    - HTML5 History API를 사용하여 URI와 UI를 동기화한 상태를 유지할 수 있는 기능을 제공한다. BrowserRouter는 URI 경로를 사용하여 브라우저의 주소를 저장하고, 브라우저 history 객체의 스택을 사용해 탐색한다. 가장 권장하는 리액트 라우터 방법이다.

    HashRouter

    - URI의 해시 정보를 이용해 URI 경로와 UI를 동기화한 상태로 유지시킨다. 해시는 # 기호로 표시된다.(localhost:3000/#/about) 이 라우터는 BrowserRouter를 지원하지 않는 환경일 때 사용할 것을 권장한다.

    MemoryRouter

    - MemoryRouter는 애플리케이션의 메모리 영역에 배열을 만들어 라우팅 정보를 저장하고 UI와 동기화 시킨다. 따라서 URI 경로가 브라우저의 주소창에 표시되지 않고 메모리에만 유지된다. 브라우저 주소 UI를 보여주지 않아도 되는 하이브리드 앱 같은 경우에 사용할 수 있다.<br /><br />

2.  404 라우트와 리디렉션

    localhost:3000/asdf와 같이 `<Route />`에 매칭되지 않는 경로를 브라우저에 직접 요청하는 경우 매칭되는 URI 경로가 없으므로 fallback UI가 없으면 404 에러 화면을 보여준다.

    확인 방법은 npm run build 후 npx serve dist --listen 3000으로 node 기반의 웹 서버 를 구동한다. 이 서버는 fallback UI 기능이 없다. localhost:3000/asdf를 직접 입력하면 404 에러 화면을 보여준다.

    ```tsx
    <Routes>
      .....
      <Route path="*" element={<NotFound />} />
    </Routes>
    ```

    이러한 404 에러를 라우트 수준에서 처리하는 것을 404 라우트라고 한다. 404 라우트는 `<Routes />` 내부의 가장 마지막에 `<Route path="*" element={<NotFound />}/>`와 같이 만든다. 404 라우트는 경로가 \*이므로 아무 경로도 매칭되지 않았다면 404 라우트에 지정된 컴포넌트가 렌더링 된다.

    ```tsx
    <Route path="/a" element={<Navigate to="/b" />} />
    <Route path="/b" element={<BComponent />} />
    ```

    또한 특정 경로로 요청하면 다른 경로로 강제 이동시켜야 하는 경우도 있다. 이 방법을 리디렉션이라고 하며 `<Navigate />` 컴포넌트를 활용하면 된다.<br /><br />

3.  NavLink

    ```tsx
    // style에 동적으로 부여
    <NavLink
      to="/about"
      style={({ isActive }) => {
        return isActive ? activeStyle : undefined;
      }}>
      About
    <NavLink />

    // className에 동적으로 부여
    <NavLink
      to="/home"
      className={({ isActive }) => {
        return isActive ? activeClassName : undefined;
      }}>
      Home
    <NavLink />
    ```

    NavLink 컴포넌트는 Link 컴포넌트와 유사하지만 현재 요청된 경로와의 일치 여부에 따라 각기 다른 스타일을 부여할 수 있는 Link 컴포넌트이다.<br /><br />

## 레이지 로딩 기법

SPA는 첫 화면을 로딩하기 위해 서버로부터 첫 화면뿐만 아니라 모든 화면을 위한 js 파일을 로딩한다. 따라서 지연 시간이 발생해서 첫 화면을 보는데 기다리는 시간이 길어질 수 있다. 이 문제를 해결하는 방법 중 하나가 레이지 로딩 기법이다.

레이지 로딩 기법을 이용한 요청 과정

1. / 경로의 첫 화면을 요청
2. 서버는 / 경로에 필요한 index.html과 home.js 파일만 응답
3. / 경로의 컴포넌트 렌더링
4. 브라우저에서 /about 경로로 이동
5. /about 렌더에 필요한 청크파일(about.js)을 서버에 요청
6. 서버는 청크파일(about.js)을 응답
7. /about 경로의 컴포넌트 렌더링

레이지 로딩 기법의 핵심은 특정 화면이 필요할 때 관련된 컴포넌트를 포함하고 있는 js 파일만을 서버에 요청하여 받아오는 것이다. 그러면 애플리케이션이 수많은 컴포넌트를 가지고 있어도 첫 화면을 요청할 때는 작은 크기의 청크 파일을 요청하고 응답 받으므로 사용자에게 첫 화면을 더 신속하게 보여줄 수 있다.

```tsx
// 기존의 정적 import 방법
import Home from "./pages/Home";

// React.lazy()와 import 함수 사용
const Home = React.lazy(() => import("./pages/Home"));

// webpackChunkName 지정
const Home = React.lazy(
  () => import(/* webpackChunkName:"home" */ "./pages/Home")
);
const About = React.lazy(
  () => import(/* webpackChunkName:"home" */ "./pages/About")
);
```

레이지 로딩을 적용하려면 컴포넌트의 임포트를 필요한 시점에 비동기로 수행할 수 있어야 하기 때문에 React.lazy()와 import() 함수를 사용한다.

webpackChunkName 주석은 이름이 같은 것끼리 모아서 청크 파일을 생성하며 청크 파일의 이름은 home.f4cleac5.js와 유사한 형태이다. 즉 함께 사용되는 컴포넌트를 모아서 하나의 청크로 생성해주는 기능이다.

💡 webpackChunkName 사용하려면 알아야 할 것

webpackChunkName은 webpack 빌드 시스템에서 지원하는 기능이다. CRA를 사용해 리액트 프로젝트를 생성했다면 webpack이 기본으로 지원되므로 별도의 설정 없이 webpackChunkName 기능을 사용할 수 있지만, Vite로 생성했다면 별도의 설정이 필요하다.

1. Vite에서 사용할 수 있도록 webpackChunkName 플러그인 설치

   ```bash
   > npm install -D vite-plugin-webpackChunkName
   ```

2. vite.config.js에 다음과 같은 vite-plugin-webpackChunkName 플러그인 설정을 추가

   ```ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import { manualChunksPlugin } from "vite-plugin-webpackchunkname";

   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [react(), manualChunksPlugin()],
   });
   ```

   <br />

## Suspense 컴포넌트

청크 파일을 필요할 때 로딩하다 보면 실행 중에 약간의 지연 시간이 발생할 수 있다. 지연 시간이 길어지면 사용자에게 로딩 중임을 알리는 화면(fallback UI)을 보여주는 것이 좋다. 이 기능을 쉽게 구현할 수 있도록 도와주는 것이 Suspense 컴포넌트다.

```tsx
// fallback 속성에는 지연 시간 동안에 보여줄 컴포넌트를 지정할 수 있다.
// 1. 특정 컴포넌트 감싸기
<React.Suspense fallback={<Loading />}>
  <TestComponent />
</React.Suspense>

// 2. <Router /> 컴포넌트 감싸기
<React.Suspense fallback={<Loading />}>
  <Router>
    .....
  </Router>
</React.Suspense>
```

Suspense 컴포넌트는 일반적인 컴포넌트도 처리할 수 있지만 `<Router />` 컴포넌트를 자식 컴포넌트로 포함할 수 있다. 이 경우 라우트가 바뀔 때 필요한 청크 파일을 레이지 로딩하게 된다.

참고 사이트

- [https://www.daleseo.com/react-suspense/](https://www.daleseo.com/react-suspense/)
- [https://17.reactjs.org/docs/concurrent-mode-suspense.html](https://17.reactjs.org/docs/concurrent-mode-suspense.html)
- [https://beta.reactjs.org/reference/react/Suspense](https://beta.reactjs.org/reference/react/Suspense)
  <br /><br />

## App1

- 리액트 라우터를 사용한 뉴진스를 소개하는 간단한 앱
- URI 퍼러미터, 중첩 라우트, index 라우트 사용
- 리액트 라우터가 제공하는 useParams, useNavigate등의 훅들 사용
- 404 라우트와 리디렉션 설정("/" 경로 요청 시 "/home"으로 강제 이동)
- 레이지 로딩 기법 적용(의도적으로 지연 시간을 발생시킴)
- Suspense 컴포넌트 적용
