export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a3a] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center text-white font-bold text-xs font-mono">
                N
              </div>
              <span className="font-bold text-[#f0f0ff]">Nova</span>
            </div>
            <p className="text-sm text-[#8888aa] leading-relaxed">
              AI 오케스트레이터 루프 안의 Quality Gate. 코드를 생성하지 않고,
              생성된 코드가 제대로 됐는지 검증한다.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#f0f0ff] mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/TeamSPWK/nova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#8888aa] hover:text-[#f0f0ff] transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TeamSPWK/nova/blob/main/docs/usage-guide.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#8888aa] hover:text-[#f0f0ff] transition-colors"
                >
                  Usage Guide
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TeamSPWK/nova/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#8888aa] hover:text-[#f0f0ff] transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#f0f0ff] mb-3">Navigate</h3>
            <ul className="space-y-2">
              {[
                ["Problem", "#problem"],
                ["How It Works", "#how-it-works"],
                ["Features", "#features"],
                ["Commands", "#commands"],
                ["Install", "#install"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-[#8888aa] hover:text-[#f0f0ff] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a3a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#444466]">
            MIT License —{" "}
            <a
              href="https://spacewalk.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8888aa] transition-colors"
            >
              Spacewalk Engineering
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/TeamSPWK/nova"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#444466] hover:text-[#8888aa] transition-colors"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
