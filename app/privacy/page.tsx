import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "개인정보처리방침 | 혜광교회",
  description: "혜광교회 개인정보처리방침",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeader title="개인정보처리방침" breadcrumb={[{ label: "개인정보처리방침" }]} />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
              <h2>1. 개인정보의 수집 및 이용 목적</h2>
              <p>혜광교회는 회원 관리, 교회 행사 안내, 서비스 제공 등을 위해 필요한 최소한의 개인정보를 수집합니다.</p>

              <h2>2. 수집하는 개인정보 항목</h2>
              <ul>
                <li>필수항목: 이름, 이메일, 연락처</li>
                <li>선택항목: 주소, 생년월일</li>
              </ul>

              <h2>3. 개인정보의 보유 및 이용기간</h2>
              <p>
                회원 탈퇴 시까지 보유하며, 탈퇴 후 즉시 파기합니다. 다만, 관련 법령에 의해 보존이 필요한 경우 해당 기간
                동안 보관합니다.
              </p>

              <h2>4. 개인정보의 제3자 제공</h2>
              <p>혜광교회는 원칙적으로 회원의 개인정보를 외부에 제공하지 않습니다.</p>

              <h2>5. 개인정보의 파기</h2>
              <p>
                개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
                파기합니다.
              </p>

              <h2>6. 문의처</h2>
              <p>개인정보 관련 문의사항이 있으시면 아래 연락처로 문의해 주세요.</p>
              <ul>
                <li>전화: 032-327-5547</li>
                <li>이메일: ihkchurch@naver.com</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
