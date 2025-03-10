const About = () => {
  return (
    <div className="h-[90vh] flex flex-col items-center  p-4 ">
      <div className="h-[85vh] overflow-y-scroll w-[80vw] flex flex-col items-center gap-10 py-5 hideScrollBar">
        <div className="h-auto w-[60vw] rounded-xl p-5 bg-gray-800 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-3">
            What is a Malicious URL?
          </h2>
          <p className="text-gray-300">
            A malicious URL is a web address that leads to harmful content, such
            as malware, phishing scams, or fraudulent websites. These URLs often
            appear legitimate but are designed to deceive users into providing
            sensitive information or downloading harmful software.
          </p>
          <p className="text-gray-300">
            Cybercriminals use various techniques like email phishing, social
            engineering, and fake advertisements to distribute malicious URLs.
            Once a user interacts with these URLs, they may expose their data,
            compromise their device, or fall victim to identity theft.
          </p>
        </div>

        <div className="h-auto w-[60vw] rounded-xl p-5 bg-gray-800 shadow-2xl">
          <h2 className="text-xl font-bold text-white">
            Types of Malicious URLs
          </h2>
        
            

            <div className="text-gray-300 mt-4">
              <h3 className="text-lg font-semibold text-white">
                Phishing URLs
              </h3>
              <p>
                Phishing URLs are designed to trick users into providing
                sensitive information such as usernames, passwords, and credit
                card details. These URLs often mimic legitimate websites, making
                it difficult for users to recognize the fraud. Cybercriminals
                commonly use phishing emails or fake login pages to deceive
                victims into entering their credentials.
              </p>
            </div>

            <div className="text-gray-300 mt-4">
              <h3 className="text-lg font-semibold text-white">Malware URLs</h3>
              <p>
                Malware URLs distribute harmful software, including viruses,
                trojans, ransomware, and spyware. When users click on these
                links, they may unknowingly download and install malicious
                programs that can steal data, corrupt files, or take control of
                their devices. Attackers often embed malware URLs in
                advertisements, social media posts, or email attachments.
              </p>
            </div>

            <div className="text-gray-300 mt-4">
              <h3 className="text-lg font-semibold text-white">
                Defacement URLs
              </h3>
              <p>
                Defacement URLs redirect users to altered or misleading web
                pages. Hackers use these to spread misinformation, political
                propaganda, or damaging content that can harm an organization’s
                reputation. These URLs may exploit website vulnerabilities to
                change their appearance and manipulate visitors' perceptions.
              </p>
            </div>

            <div className="text-gray-300 mt-4">
              <h3 className="text-lg font-semibold text-white">
                Command & Control URLs
              </h3>
              <p>
                These URLs allow hackers to communicate with infected devices
                and execute malicious activities remotely. Cybercriminals use
                them to control botnets, spread ransomware, and exfiltrate
                sensitive data. Command & Control URLs enable attackers to
                maintain persistent access to compromised systems, making them a
                significant cybersecurity threat.
              </p>
            </div>

            <p className="text-gray-300 mt-4">
              Each of these malicious URLs poses unique risks, but their common
              objective is to exploit users and systems for financial or
              strategic gain. Understanding these threats can help individuals
              and organizations take proactive measures to protect themselves
              online.
            </p>
          

          <p className="text-gray-300">
            Each type of malicious URL serves a different purpose but shares the
            common goal of exploiting users and their systems for personal or
            financial gain.
          </p>
        </div>

        <div className="h-auto w-[60vw] rounded-xl p-5 bg-gray-800 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-3">
            Why Protect Against Malicious URLs?
          </h2>
          <p className="text-gray-300">
            Protecting against malicious URLs is crucial to prevent data
            breaches, financial loss, and system infections. Cyberattacks often
            rely on deceptive links to compromise users' security and gain
            unauthorized access to confidential information.
          </p>
          <p className="text-gray-300">
            Many organizations and individuals have suffered significant losses
            due to phishing scams and malware infections. Ensuring that you
            recognize and avoid malicious URLs can help safeguard personal data,
            financial assets, and digital infrastructure.
          </p>
        </div>

        <div className="h-auto w-[60vw] rounded-xl p-5 bg-gray-800 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-3">How to Stay Safe</h2>
          <ul className="list-disc pl-5 text-gray-300">
            <li>
              Always verify URLs before clicking, especially in emails and
              messages.
            </li>
            <li>
              Use antivirus and URL scanning tools to detect and block malicious
              links.
            </li>
            <li>
              Never enter personal or financial details on suspicious websites.
            </li>
            <li>
              Enable multi-factor authentication (MFA) to add an extra layer of
              security.
            </li>
            <li>
              Regularly update software and security patches to protect against
              vulnerabilities.
            </li>
            <li>
              Educate yourself and others about cybersecurity risks and safe
              browsing practices.
            </li>
          </ul>
          <p className="text-gray-300">
            By taking these precautions, you can significantly reduce the risk
            of falling victim to cyber threats and keep your data secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
