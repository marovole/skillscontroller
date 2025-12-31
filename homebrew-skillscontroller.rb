# Homebrew formula for skillscontroller
# 安装: brew install marovole/tap/skillscontroller

class Skillscontroller < Formula
  desc "智能技能编排控制器 - 根据上下文动态激活/停用 Claude Code 技能"
  homepage "https://github.com/marovole/skillscontroller"
  url "https://registry.npmjs.org/skillscontroller/-/skillscontroller-1.0.0.tgz"
  sha256 "5dc0894bbebd55f14919605e62043a94f8769888aa26cc6c4a15c67250f50b5a"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink libexec.glob("bin/*") => "skillscontroller"
  end

  test do
    system bin/"skillscontroller", "--help"
  end
end
