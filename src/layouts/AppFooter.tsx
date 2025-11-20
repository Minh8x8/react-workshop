import {
  AtSymbolIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CodeBracketIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const footerLinks = [
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Licensing", href: "/licensing" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Website", href: "#", icon: GlobeAltIcon },
  { label: "Email", href: "#", icon: AtSymbolIcon },
  { label: "Community", href: "#", icon: ChatBubbleOvalLeftEllipsisIcon },
  { label: "Developers", href: "#", icon: CodeBracketIcon },
];

const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50 px-4 py-8 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-10">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {year} Simple KYC. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white"
                href={social.href}
                key={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
