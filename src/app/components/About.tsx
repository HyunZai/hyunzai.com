import Container from "./Container";

export default function About() {
  return (
    <div className="relative z-10 min-h-screen bg-dark-bg text-white py-20">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-primary">About Me</h2>
        
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-300">
          <p>
            안녕하세요, 저는 <span className="text-white font-semibold">풀스택 웹 개발자 김현재</span>입니다.
          </p>
          <p>
            새로운 기술을 배우고 적용하는 것을 즐기며, 사용자에게 최고의 경험을 제공하기 위해 끊임없이 고민합니다.
            단순히 코드를 작성하는 것을 넘어, 비즈니스 가치를 창출하고 문제를 해결하는 개발자가 되고자 합니다.
          </p>
          <p>
            현재는 웹 프론트엔드와 백엔드 전반에 걸친 기술 스택을 다루고 있으며, 
            특히 React, Next.js, Node.js 생태계에 깊은 관심을 가지고 있습니다.
          </p>
        </div>
      </Container>
    </div>
  );
}
