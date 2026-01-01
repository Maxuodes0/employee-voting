"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./language-provider";

const NAMES = [
  "محمد",
  "عبدالله",
  "سارة",
  "نورة",
  "فهد",
  "خالد",
  "ريم",
  "وليد",
  "تركي",
  "هدى",
];

const COPY = {
  ar: {
    logo: "The Moment",
    nav: ["الرئيسية", "العملية", "القيم"],
    eyebrow: "برنامج التقدير الداخلي",
    headline: "التصويت على موظف الشهر",
    description:
      "هذه الصفحة مخصصة للتصويت الداخلي أثناء الحفل. يرجى اختيار اسمك للمتابعة.",
    secondary: "هذه الخطوة للتعريف بك قبل متابعة التصويت.",
    nameLabel: "اختر اسمك",
    placeholder: "اختر اسمك",
    confirmation: "مرحباً {name}، يرجى إكمال التصويت.",
    ctaNav: "متابعة",
    valuesTitle: "اختر الموظف الذي يمثل كل قيمة",
    submit: "إرسال التصويت",
    submitted: "تم استلام تصويتك بنجاح. شكراً لمشاركتك.",
  },
  en: {
    logo: "The Moment",
    nav: ["Home", "Process", "Values"],
    eyebrow: "Internal Recognition Program",
    headline: "Employee of the Month Voting",
    description:
      "This page is for internal voting during the event. Please select your name to continue.",
    secondary: "This step identifies you before you submit your votes.",
    nameLabel: "Select your name",
    placeholder: "Choose your name",
    confirmation: "Welcome {name}, please proceed with voting.",
    ctaNav: "Continue",
    valuesTitle: "Select the employee who best represents each value",
    submit: "Submit Vote",
    submitted: "Your vote has been submitted successfully. Thank you.",
  },
};

const VALUES = [
  { key: "integrity", ar: "النزاهة", en: "Integrity" },
  { key: "transparency", ar: "الشفافية", en: "Transparency" },
  { key: "collaboration", ar: "الشراكة", en: "Collaboration" },
  { key: "innovation", ar: "الابتكار", en: "Innovation" },
  { key: "accountability", ar: "الاستقلالية", en: "Accountability" },
];

const SAMPLE_VOTE_STATUS: Record<
  (typeof VALUES)[number]["key"],
  { name: string; votes: number }[]
> = {
  integrity: [
    { name: "عبدالله", votes: 24 },
    { name: "سارة", votes: 19 },
    { name: "محمد", votes: 15 },
    { name: "ريم", votes: 11 },
    { name: "نورة", votes: 8 },
  ],
  transparency: [
    { name: "سارة", votes: 22 },
    { name: "عبدالله", votes: 18 },
    { name: "وليد", votes: 14 },
    { name: "ريم", votes: 10 },
    { name: "تركي", votes: 7 },
  ],
  collaboration: [
    { name: "ريم", votes: 25 },
    { name: "خالد", votes: 19 },
    { name: "فهد", votes: 16 },
    { name: "محمد", votes: 12 },
    { name: "هدى", votes: 9 },
  ],
  innovation: [
    { name: "تركي", votes: 23 },
    { name: "نورة", votes: 17 },
    { name: "وليد", votes: 14 },
    { name: "سارة", votes: 11 },
    { name: "عبدالله", votes: 9 },
  ],
  accountability: [
    { name: "محمد", votes: 21 },
    { name: "عبدالله", votes: 18 },
    { name: "فهد", votes: 14 },
    { name: "ريم", votes: 10 },
    { name: "خالد", votes: 8 },
  ],
};

type LanguageKey = keyof typeof COPY;

const VALUES_COPY = {
  integrity: {
    ar: "الالتزام بالصدق والأمانة والعمل وفق أعلى المعايير الأخلاقية في جميع التعاملات.",
    en: "Acting with honesty, ethics, and strong moral principles in all interactions.",
  },
  transparency: {
    ar: "الوضوح في التواصل ومشاركة المعلومات بصدق ومسؤولية.",
    en: "Communicating openly and sharing information clearly and responsibly.",
  },
  collaboration: {
    ar: "العمل بروح الفريق والتعاون لتحقيق أهداف مشتركة.",
    en: "Working together as a team to achieve shared goals.",
  },
  innovation: {
    ar: "تقديم أفكار جديدة وحلول إبداعية لتحسين العمل وتطويره.",
    en: "Introducing new ideas and creative solutions to improve and evolve work.",
  },
  accountability: {
    ar: "تحمل المسؤولية واتخاذ القرارات بثقة ضمن الصلاحيات.",
    en: "Taking ownership and making confident decisions within assigned responsibilities.",
  },
};

const PROCESS_COPY = {
  ar: "تهدف عملية التصويت إلى تعزيز ثقافة التقدير داخل الجهة، من خلال تمكين الموظفين من المشاركة في اختيار موظف الشهر بناءً على القيم المؤسسية.\nتسهم هذه العملية في ترسيخ مبادئ النزاهة، الشفافية، الشراكة، الابتكار، والاستقلالية، وتعزز روح الانتماء والعمل الجماعي.",
  en: "The voting process aims to promote a culture of recognition by allowing employees to participate in selecting the Employee of the Month based on core organizational values.\nThis process reinforces integrity, transparency, collaboration, innovation, and accountability while strengthening team engagement.",
};

function LanguageToggle({
  language,
  onChange,
}: {
  language: LanguageKey;
  onChange: (lang: LanguageKey) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-1.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
      {(["ar", "en"] as LanguageKey[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`rounded-full px-2.5 py-1 transition ${
            language === lang
              ? "bg-slate-900 text-white shadow-sm"
              : "hover:bg-slate-100"
          }`}
        >
          {lang === "ar" ? "AR" : "EN"}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [selectedName, setSelectedName] = useState("");
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastChangedValue, setLastChangedValue] = useState<string | null>(null);
  const [showProcess, setShowProcess] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const copy = useMemo(() => COPY[language], [language]);
  const isArabic = language === "ar";
  const alignment = "text-center";
  const alignmentItems = "items-center";

  const allValuesSelected =
    Object.keys(votes).length === VALUES.length &&
    VALUES.every((value) => votes[value.key]);

  const availableNames = NAMES.filter((name) => name !== selectedName);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate='reveal']"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-[-35%] h-[70%] bg-gradient-to-t from-[#f6e3ff] via-[#ffe9d6] to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(255,255,255,0.9),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.85),transparent_32%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 pb-16 pt-3 sm:px-8 lg:px-14">
        <nav className="grid grid-cols-[auto,1fr,auto] items-center gap-3 px-1 py-2 sm:py-3">
          <div className="text-base font-semibold text-slate-900 sm:text-xl">
            {copy.logo}
          </div>

          <div className="hidden items-center justify-center gap-8 text-sm font-medium text-slate-600 md:flex">
            {copy.nav.map((item) => {
              const isProcess = item === (isArabic ? "العملية" : "Process");
              const isValues = item === (isArabic ? "القيم" : "Values");
              const isHome = item === (isArabic ? "الرئيسية" : "Home");
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    if (isHome) {
                      setShowProcess(false);
                      setShowValues(false);
                      setShowStatus(false);
                    } else if (isProcess) {
                      setShowProcess((prev) => !prev);
                      setShowValues(false);
                      setShowStatus(false);
                    } else if (isValues) {
                      setShowValues((prev) => !prev);
                      setShowProcess(false);
                      setShowStatus(false);
                    }
                  }}
                  className="cursor-pointer rounded-full px-2 py-1 transition hover:text-slate-900 hover:underline"
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <LanguageToggle
              language={language}
              onChange={(lang) => setLanguage(lang)}
            />
            <button
              type="button"
              onClick={() => {
                setShowStatus((prev) => !prev);
                setShowProcess(false);
                setShowValues(false);
              }}
              className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex"
            >
              {isArabic ? "حالة التصويت" : "Vote status"}
            </button>
          </div>

          <div className="col-span-3 mt-2 flex flex-wrap items-center justify-center gap-2 md:hidden">
            {copy.nav.map((item) => {
              const isProcess = item === (isArabic ? "العملية" : "Process");
              const isValues = item === (isArabic ? "القيم" : "Values");
              const isHome = item === (isArabic ? "الرئيسية" : "Home");
              return (
                <button
                  type="button"
                  key={`mobile-${item}`}
                  onClick={() => {
                    if (isHome) {
                      setShowProcess(false);
                      setShowValues(false);
                      setShowStatus(false);
                    } else if (isProcess) {
                      setShowProcess((prev) => !prev);
                      setShowValues(false);
                      setShowStatus(false);
                    } else if (isValues) {
                      setShowValues((prev) => !prev);
                      setShowProcess(false);
                      setShowStatus(false);
                    }
                  }}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {item}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setShowStatus((prev) => !prev);
                setShowProcess(false);
                setShowValues(false);
              }}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {isArabic ? "حالة التصويت" : "Vote status"}
            </button>
          </div>
        </nav>

        <main className="flex flex-1 flex-col items-center text-center">
          <div
            data-animate="reveal"
            className={`mt-8 flex w-full max-w-4xl flex-col items-center gap-3 sm:mt-12 sm:gap-5 lg:mt-16 lg:gap-6 ${alignment} ${alignmentItems} animate-[fadeIn_700ms_ease]`}
          >
            <span className="text-sm font-medium tracking-[0.14em] text-slate-500">
              {copy.eyebrow}
            </span>
            <h1 className="max-w-4xl text-[clamp(1.9rem,5.4vw,3.6rem)] font-semibold leading-tight text-slate-900 sm:text-[clamp(2.4rem,5vw,4.3rem)] lg:text-[clamp(2.8rem,4vw,4.6rem)]">
              {copy.headline}
            </h1>
            <p className="max-w-3xl text-[clamp(0.98rem,2.5vw,1.15rem)] leading-relaxed text-slate-600 sm:text-[clamp(1.08rem,2.4vw,1.22rem)]">
              {copy.description}
            </p>
            <p className="text-sm text-slate-500 sm:text-[0.95rem] lg:text-base">
              {copy.secondary}
            </p>
          </div>

          {(showProcess || showValues || showStatus) && (
            <div className="mt-10 flex w-full max-w-5xl flex-col items-center gap-6 px-2 sm:px-4 lg:px-8">
              {showProcess && (
                <div className="w-full rounded-3xl border border-white/70 bg-white/90 p-6 text-slate-800 shadow-md backdrop-blur animate-[fadeSlideUp_0.35s_ease-out] sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {isArabic ? "العملية" : "The Process"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowProcess(false)}
                      className="rounded-full px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                      {isArabic ? "إغلاق" : "Close"}
                    </button>
                  </div>
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed sm:text-base">
                    {isArabic ? PROCESS_COPY.ar : PROCESS_COPY.en}
                  </p>
                </div>
              )}

              {showValues && (
                <div className="w-full rounded-3xl border border-white/70 bg-white/90 p-6 text-slate-800 shadow-md backdrop-blur animate-[fadeSlideUp_0.35s_ease-out] sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {isArabic ? "القيم" : "The Values"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowValues(false)}
                      className="rounded-full px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                      {isArabic ? "إغلاق" : "Close"}
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:gap-4">
                    {VALUES.map((value) => (
                      <div
                        key={value.key}
                        className="rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 text-start shadow-sm animate-[fadeSlideUp_0.35s_ease-out]"
                      >
                        <p className="text-sm font-semibold text-slate-900 sm:text-base">
                          {isArabic ? value.ar : value.en}
                        </p>
                        <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                          {isArabic
                            ? VALUES_COPY[value.key as keyof typeof VALUES_COPY].ar
                            : VALUES_COPY[value.key as keyof typeof VALUES_COPY].en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showStatus && (
                <div className="w-full rounded-3xl border border-white/70 bg-white/90 p-6 text-slate-800 shadow-md backdrop-blur animate-[fadeSlideUp_0.35s_ease-out] sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {isArabic ? "حالة التصويت" : "Vote Status"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowStatus(false)}
                      className="rounded-full px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                      {isArabic ? "إغلاق" : "Close"}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-slate-500 sm:text-sm">
                    {isArabic
                      ? "بيانات تجريبية للمراكز من الأول إلى الخامس لكل قيمة."
                      : "Sample data showing positions 1–5 per value."}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {VALUES.map((value) => (
                      <div
                        key={`status-${value.key}`}
                        className="rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-sm"
                      >
                        <p className="text-sm font-semibold text-slate-900 sm:text-base">
                          {isArabic ? value.ar : value.en}
                        </p>
                        <div className="mt-3 space-y-2">
                          {SAMPLE_VOTE_STATUS[value.key].map((entry, index) => (
                            <div
                              key={entry.name}
                              className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2 text-sm text-slate-700 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.45)]"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-500">
                                  {index + 1}.
                                </span>
                                <span>{entry.name}</span>
                              </span>
                              <span className="text-xs font-medium text-slate-500">
                                {entry.votes} {isArabic ? "صوت" : "votes"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div
            data-animate="reveal"
            className="mt-8 w-full max-w-xl animate-[fadeIn_900ms_ease] sm:mt-12"
          >
            <div
              className={`flex flex-col items-center ${alignmentItems} gap-4 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6 ${alignment}`}
            >
              <label className="text-base font-semibold text-slate-800 sm:text-lg">
                {copy.nameLabel}
              </label>
              <select
                value={selectedName}
                onChange={(e) => {
                  setSelectedName(e.target.value);
                  setVotes({});
                  setSubmitted(false);
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-800 shadow-inner outline-none transition focus:border-slate-400 focus:shadow-[0_14px_32px_-18px_rgba(15,23,42,0.45)] focus:ring-2 focus:ring-slate-100"
              >
                <option value="" disabled>
                  {copy.placeholder}
                </option>
                {NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-slate-500 sm:text-sm">
                {selectedName
                  ? copy.confirmation.replace("{name}", selectedName)
                  : isArabic
                    ? "هذه الصفحة مخصصة للتعريف فقط. لا يوجد تصويت هنا."
                    : "This page is identification only. No voting yet."}
              </div>
            </div>
          </div>

          {selectedName && !submitted && (
            <section
              data-animate="reveal"
              className="mt-10 w-full max-w-5xl animate-[fadeIn_1000ms_ease] lg:mt-14"
            >
              <div
                className={`flex flex-col items-center ${alignmentItems} gap-6 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6 ${alignment}`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h2 className="w-full text-lg font-semibold text-slate-900 sm:text-xl">
                    {copy.valuesTitle}
                  </h2>
                </div>
                <div className="grid w-full gap-4 md:grid-cols-2">
                  {VALUES.map((value) => (
                    <div
                      key={value.key}
                      className="rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-[0_10px_34px_-26px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_42px_-30px_rgba(15,23,42,0.5)]"
                    >
                      <div className="flex items-center justify-between gap-3 pb-3">
                        <div className="flex items-center gap-3 text-slate-900">
                          <span
                            className="h-2.5 w-2.5 rounded-full bg-slate-300 ring-1 ring-slate-200"
                            aria-hidden
                          />
                          <span className="font-semibold">
                            {isArabic ? value.ar : value.en}
                          </span>
                        </div>
                      </div>
                      <select
                        value={votes[value.key] || ""}
                        disabled={!selectedName}
                        onChange={(e) => {
                          setVotes((prev) => ({
                            ...prev,
                            [value.key]: e.target.value,
                          }));
                          setLastChangedValue(value.key);
                        }}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-800 shadow-inner outline-none transition focus:border-slate-400 focus:shadow-[0_14px_32px_-18px_rgba(15,23,42,0.45)] focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <option value="" disabled>
                          {isArabic ? "اختر موظفاً" : "Select employee"}
                        </option>
                        {availableNames.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-slate-500">
                        {isArabic
                          ? "يجب اختيار موظف مختلف عنك."
                          : "You cannot vote for yourself."}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <button
                    type="button"
                    disabled={!allValuesSelected}
                    onClick={() => setSubmitted(true)}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold transition sm:w-auto sm:px-8 ${
                      allValuesSelected
                        ? "bg-slate-900 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
                        : "cursor-not-allowed bg-slate-200 text-slate-500"
                    }`}
                  >
                    <span>{copy.submit}</span>
                    <ArrowRight
                      className={`h-4 w-4 ${isArabic ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </section>
          )}

          {submitted && (
            <div className="mt-12 w-full max-w-3xl animate-[fadeIn_1100ms_ease] rounded-3xl border border-white/70 bg-white/85 p-6 text-center shadow-sm backdrop-blur sm:p-7">
              <p className="text-base font-medium text-slate-800 sm:text-lg">
                {copy.submitted}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
