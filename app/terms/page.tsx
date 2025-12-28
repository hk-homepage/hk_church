import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "이용약관 | 혜광교회",
  description: "혜광교회 이용약관",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeader title="이용약관" breadcrumb={[{ label: "이용약관" }]} />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
              <h2>제1조 (목적)</h2>
              <p>
                이 약관은 혜광교회 웹사이트가 제공하는 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
              </p>

              <h2>제2조 (서비스의 내용)</h2>
              <p>혜광교회 웹사이트는 다음과 같은 서비스를 제공합니다.</p>
              <ul>
                <li>교회 소식 및 공지사항 안내</li>
                <li>온라인 예배 서비스</li>
                <li>교회 일정 안내</li>
                <li>성도 간 교제 및 나눔</li>
              </ul>

              <h2>제3조 (이용자의 의무)</h2>
              <p>이용자는 서비스 이용 시 다음 행위를 하여서는 안 됩니다.</p>
              <ul>
                <li>타인의 정보 도용</li>
                <li>서비스에 위해를 가하는 행위</li>
                <li>법령 및 공서양속에 반하는 행위</li>
              </ul>

              <h2>제4조 (서비스의 중단)</h2>
              <p>혜광교회는 시스템 점검 등의 사유로 서비스 제공을 일시적으로 중단할 수 있습니다.</p>

              <h2>제5조 (면책조항)</h2>
              <p>혜광교회는 천재지변 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
