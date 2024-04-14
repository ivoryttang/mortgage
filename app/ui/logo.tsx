import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <img src="/assets/img/logo.png" alt="Logo" width="40" height="40" />
      <p className="text-[34px] text-black">omus</p>
    </div>
  );
}
