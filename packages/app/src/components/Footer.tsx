import { DiscordSvg } from "./images/DiscordSvg";
import { GitHubSvg } from "./images/GitHugSvg";
import { TwitterSvg } from "./images/TwitterSvg";

export const Footer = () => {
  const navigation = [
    {
      name: "Discord",
      href: "#",
      icon: DiscordSvg,
    },
    {
      name: "Twitter",
      href: "#",
      icon: TwitterSvg,
    },
    {
      name: "GitHub",
      href: "https://github.com/davidvuong/pozition",
      icon: GitHubSvg,
    },
  ];

  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-xs uppercase text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-misto">Pozition</span>, ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
