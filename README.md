# react
package.json에     "homepage": "./" 있으면 npm run build하여 build 폴더 업데이트 및 생성후 이 웹호스팅 서버에 올릴 최종본 build폴더를 카페24,닥터홈 웹서버에다가 올리면 당연히 작동함(웹호스팅과 서버호스팅(온전히 나만씀))
build 폴더 안에 index.html을 open live serve하면 작성한 것이 나옴
=> 그러나 업데이트 및 수정을 하려면 웹서버에 htp프로그램을 이용해서 접속한 다음 계속 올리고 내리는 번거로음이 있어 GitHub에 파일을 버전 관리하니 그걸 이용해 자동으로 업데이트(즉 build)되는 웹포스팅 서버에서 서비스 되는 것과 같은 서비스를 해주는 netlify, vercel을 이용한다.
GitHub에서 파일 만들면서 public을 해야 깃허브페이지 또는 netlify, vercel등에 쓸수 있다.
vs code에 레퍼지스토리와 연동하기 위해 git init 후 git add .하면 모든 파일을 깃에 다 올릴 수 있다.
혹시 main 없이 혼자하면 굳이 쓰지 않아도 되어 그냥 master로 써도 됨
그러나 깃 저장소(레포지스토리) build 폴더는 따로 없다.

#깃 저장소 만들후 vs에서 폴더와 깃저장소 연결해주기(가상의 공간)
1. git init
2. git add . (add다음에 파일명 넣으면 그 파일만 올리는 것이나 모두 올리려면 . 으로)
3. git branch -M main (main 말고 master로 나혼자 쓸때는 생략가능)
4. git remote add origin https://github.com/KimJinhee72/react.git (저장소 이름 아래 code로 가서 addfile 옆 code에 url 복사
5. git bush -u origin main
==> 1-5번 까지 하면 완료되어 깃허브 페이지에 올라감
   * 커밋 푸시
     1.  git add .
     2.  git commit -m 'title 변경'
     3.  git push
