# architecture-framework-mbackend


- 해당 코드는 AWS 환경에서 개발자가 소스코드를 Push 했을경우 

  CI/CD의 Test Stage에서 소나큐브 및 보안프로그램에서 새로작성된 소스코드가

  커버리지 및 보안사항을 자동으로 점검하도록 만든 것.

  

  1. sonar-runner.js, sonar-sacnner.js (소나큐브에서 커버리지 테스트 후 리턴값에 의해 Code Delivery 프로세스 진행여부 결정)

  2. snyk.js (OSS 테스트를 위한 snyk 클라이언트 테스트 후 리턴값에 의해 Code Delivery 프로세스 진행여부 결정)

  3. sast-scan.js (SAST 테스트를 위한 NodeJsScan 클라이언트 테스트 후 리턴값에 의해 Code Delivery 프로세스 진행여부 결정)

  4. zaproxy.js  (DAST 테스트를 위해 owasp zap 클라이언트에 테스트 후 리턴값에 의해 Code Delivery 프로세스 진행여부 결정)

 

해당 파일들은 codebuild에서 TestStage에서 소스코드를 Codebuild 컨테이너 내부에서 가동중인 Sonarqube, NodeJsScan, Owasp zap, snyk 클라이언트에 보내서

결과값을 리턴받도록 연동시켜주는 파일들이며

소스코드 배포간에 보안테스트 단계를 아래와 같이 3단계로 구분하였으며 

 

1,.SAST (작성된 정적코드 보안결함여부 테스트) 

2. DAST (소스코드 배포 후 가동되는 사이트에 모의침투 테스트) 

3. OSS (참조하는 오픈소스 라이브러리의 보안결함 여부 확인) 

 

소나큐브의 경우 연동되는 라이브러리가 제대로 동작하지 않아 기존 라이브러리를 참조하여 동작하도록 변경.


