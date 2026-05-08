import svgPaths from "./svg-jf1ubhrqmk";
import imgAvatar from "figma:asset/425014815828544c6be381aa86661be1b4dad5c3.png";
import imgFrame48095878 from "figma:asset/36a76ec8bcd42656981c00fd01de829022abe1e2.png";
import imgFrame48095879 from "figma:asset/4cbbed1d702cba3bc804760c8f55954a98067f36.png";
import imgAvatarBase from "figma:asset/5dd6fca175575696012861fc13ca31dd8d720ad5.png";

function Time() {
  return (
    <div className="absolute h-[54px] left-0 right-[64.89%] top-1/2 translate-y-[-50%]" data-name="Time">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[33.96%_36.76%_25.3%_36.96%] leading-[22px] not-italic text-[#fdfdfd] text-[17px] text-center text-nowrap">9:41</p>
    </div>
  );
}

function Battery() {
  return (
    <div className="absolute bottom-[33.33%] contents left-[calc(50%+24.71px)] top-[42.59%] translate-x-[-50%]" data-name="Battery">
      <div className="absolute border border-[#fdfdfd] border-solid bottom-[33.33%] left-[calc(50%+23.55px)] opacity-[0.35] rounded-[4.3px] top-[42.59%] translate-x-[-50%] w-[25px]" data-name="Border" />
      <div className="absolute bottom-[41.01%] left-[calc(50%+37.71px)] top-[51.45%] translate-x-[-50%] w-[1.328px]" data-name="Cap">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(253, 253, 253, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d={svgPaths.p193f1400} fill="var(--fill-0, #FDFDFD)" id="Cap" opacity="0.4" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#fdfdfd] bottom-[37.04%] left-[calc(50%+23.55px)] rounded-[2.5px] top-[46.3%] translate-x-[-50%] w-[21px]" data-name="Capacity" />
    </div>
  );
}

function Levels() {
  return (
    <div className="absolute h-[54px] left-[63.61%] right-0 top-1/2 translate-y-[-50%]" data-name="Levels">
      <Battery />
      <div className="absolute bottom-[33.4%] left-[calc(50%-4.68px)] top-[43.77%] translate-x-[-50%] w-[17.142px]" data-name="Wifi">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(253, 253, 253, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13">
            <path clipRule="evenodd" d={svgPaths.p1fac3f80} fill="var(--fill-0, #FDFDFD)" fillRule="evenodd" id="Wifi" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[33.77%] left-[calc(50%-30.35px)] top-[43.58%] translate-x-[-50%] w-[19.2px]" data-name="Cellular Connection">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(253, 253, 253, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 13">
            <path clipRule="evenodd" d={svgPaths.p1e09e400} fill="var(--fill-0, #FDFDFD)" fillRule="evenodd" id="Cellular Connection" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatusBarIPhone() {
  return (
    <div className="h-[54px] relative shrink-0 w-[390px]" data-name="Status Bar - iPhone">
      <Time />
      <Levels />
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col items-start pointer-events-auto sticky top-0">
      <StatusBarIPhone />
    </div>
  );
}

function ArrowBackIosNew() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="arrow_back_ios_new">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="arrow_back_ios_new">
          <mask height="18" id="mask0_1_2296" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="18" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="18" id="Bounding box" width="18" />
          </mask>
          <g mask="url(#mask0_1_2296)">
            <path d={svgPaths.p1d778380} fill="var(--fill-0, #FDFDFD)" id="arrow_back_ios_new_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Mask() {
  return (
    <div className="absolute bg-white inset-[-45.45px_-45.18px_-45.18px_-45.45px]" data-name="Mask">
      <div className="absolute bg-black inset-[69.09px_69px_69px_69.09px] rounded-[909.091px]" data-name="Shape" />
    </div>
  );
}

function Blur() {
  return <div className="absolute backdrop-blur-[18.182px] backdrop-filter bg-[rgba(0,0,0,0.04)] blur-[9.091px] filter inset-[25.45px_23.91px_22.09px_23.64px] mix-blend-hard-light rounded-[909.091px]" data-name="Blur" />;
}

function Blur1() {
  return (
    <div className="absolute inset-[-23.64px] opacity-[0.67]" data-name="Blur">
      <Mask />
      <Blur />
    </div>
  );
}

function Fill() {
  return (
    <div className="absolute inset-0 rounded-[269.091px]" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[269.091px]">
        <div className="absolute bg-[#333] inset-0 mix-blend-color-dodge rounded-[269.091px]" />
        <div className="absolute inset-0 rounded-[269.091px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 247, 247) 0%, rgb(247, 247, 247) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" }} />
      </div>
    </div>
  );
}

function GlassEffect() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[269.091px]" data-name="Glass Effect" />;
}

function Bg() {
  return (
    <div className="absolute h-[40px] left-0 right-0 top-1/2 translate-y-[-50%]" data-name="BG">
      <Blur1 />
      <Fill />
      <GlassEffect />
    </div>
  );
}

function Avatar() {
  return (
    <div className="absolute left-[0.34px] rounded-[125px] size-[40px] top-[0.34px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[125px] size-full" src={imgAvatar} />
    </div>
  );
}

function ProfilePicture() {
  return (
    <div className="bg-[#2d2d2d] overflow-clip relative rounded-[90.909px] shrink-0 size-[38.182px]" data-name="profile picture">
      <Avatar />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex h-[32.727px] items-center justify-center min-w-[32.72727584838867px] px-[7.273px] py-0 relative rounded-[90.909px] shrink-0" data-name="Text">
      <ProfilePicture />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="bg-white content-stretch flex gap-[10.909px] items-center justify-center min-w-[40px] mix-blend-multiply px-[1.818px] py-0 relative rounded-[269.091px] shrink-0 size-[40px]" data-name="Button Group 1">
      <Bg />
      <Text />
    </div>
  );
}

function Frame34() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#e0e0e0] text-[14px] text-nowrap tracking-[0.5px]">Violet Cole</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <Frame34 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[16px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[100px]">
        <div className="absolute inset-0 overflow-hidden rounded-[100px]">
          <img alt="" className="absolute h-[150.47%] left-[1.35%] max-w-none top-[-2.31%] w-full" src={imgFrame48095878} />
        </div>
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[100px] size-full" src={imgFrame48095879} />
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame21 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.35] not-italic relative shrink-0 text-[#f0f0f0] text-[10px] text-nowrap tracking-[0.5px]">Monica Miller</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <path d={svgPaths.p367e8cc0} id="Path" stroke="var(--stroke-0, #F0F0F0)" strokeLinecap="round" strokeLinejoin="round" />
          <g id="Path_2"></g>
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[#2d2d2d] content-stretch flex items-center px-[4px] py-[2px] relative rounded-[8px] shrink-0">
      <Frame23 />
      <ChevronDown />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame31 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[5px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
      <Frame30 />
      <Frame22 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <ButtonGroup />
      <Frame39 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[20.83%_12.5%]" data-name="Group">
      <div className="absolute inset-[-5.36%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 11">
          <g id="Group">
            <path clipRule="evenodd" d={svgPaths.p2c509200} fillRule="evenodd" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p26c8ac80} id="Path_2" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1644cd80} id="Path_3" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p22d74c00} id="Path_4" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <Group />
    </div>
  );
}

function EmailsEmailsLetterMail() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Emails/Emails, Letter, Mail">
      <Group1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(90,95,242,0.2)] relative rounded-[66.667px] shrink-0">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[inherit]">
        <EmailsEmailsLetterMail />
      </div>
      <div aria-hidden="true" className="absolute border-[#5a5ff2] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[66.667px]" />
    </div>
  );
}

function PhonesPhoneCall() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Phones/Phone, Call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p8e25c40} fillRule="evenodd" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" />
          <g id="Path_2"></g>
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[rgba(90,95,242,0.2)] relative rounded-[66.667px] shrink-0">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[inherit]">
        <PhonesPhoneCall />
      </div>
      <div aria-hidden="true" className="absolute border-[#5a5ff2] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[66.667px]" />
    </div>
  );
}

function MessagesChatChatMessagesBubble() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Messages, Chat/Chat, Messages, Bubble">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p36271b00} fillRule="evenodd" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" />
          <g id="Path_2"></g>
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[rgba(90,95,242,0.2)] relative rounded-[66.667px] shrink-0">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[inherit]">
        <MessagesChatChatMessagesBubble />
      </div>
      <div aria-hidden="true" className="absolute border-[#5a5ff2] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[66.667px]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[9px] items-start justify-end relative shrink-0 w-[112px]">
      <Frame9 />
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-[128px]">
      <Frame12 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <Frame32 />
      <Frame5 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame27 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[330px]">
      <ArrowBackIosNew />
      <Frame29 />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[17.079px]" data-name="Chevron / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Chevron / Down">
          <path d={svgPaths.p1b285540} id="Vector" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.06743" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(54,83,20,0.2)] content-stretch flex items-center justify-between overflow-clip px-[9.316px] py-[3.105px] relative rounded-[35.711px] shrink-0 w-[291px]" data-name="Badge">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ecfccb] text-[14px] text-nowrap tracking-[0.7763px]">
        <p className="leading-[1.5]">New Client</p>
      </div>
      <ChevronDown1 />
    </div>
  );
}

function Frame24() {
  return <div className="h-[29.605px] shrink-0 w-[163.132px]" />;
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-[291px]">
      <Badge />
      <Frame24 />
    </div>
  );
}

function MoreVert() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="more_vert">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_1_2243" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_2243)">
            <path d={svgPaths.p1ec9ea00} fill="var(--fill-0, #A5A8FF)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0">
      <Frame2 />
      <MoreVert />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pl-0 pr-[16px] py-[12px] relative shrink-0">
      <Frame3 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 330 1">
            <path d="M0 0.5H330" id="Vector 474" stroke="var(--stroke-0, #3D3C3C)" />
          </svg>
        </div>
      </div>
      <Frame6 />
    </div>
  );
}

function UserListItem() {
  return (
    <div className="h-[130px] relative shrink-0 w-full" data-name="User-List-Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] pr-0 py-0 relative size-full">
          <Frame28 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col h-[130px] items-start relative shrink-0 w-full">
      <UserListItem />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#1e1e1e] content-stretch flex flex-col h-[130px] items-start relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#404040] border-solid inset-[-0.5px] pointer-events-none rounded-[16.5px]" />
      <Frame1 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-[rgba(239,239,244,0)] content-stretch flex flex-col h-[130px] items-start left-1/2 rounded-[10px] top-0 translate-x-[-50%] w-[358px]">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none rounded-[11px]" />
      <Frame26 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[130px] overflow-clip relative shrink-0 w-full">
      <Frame33 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame7 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p296ad200} id="Vector" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M20 3V7" id="Vector_2" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 5H18" id="Vector_3" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M4 17V19" id="Vector_4" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 18H3" id="Vector_5" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ContentBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Content block">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#fdfdfd] text-[12px] tracking-[0.5px] w-full">Mel, summarize Violet Cole</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#fdfdfd] text-[14px] text-nowrap tracking-[0.5px]">
        <p className="leading-[1.5]">AI summary</p>
      </div>
      <ContentBlock />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Container">
      <Frame />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="backdrop-blur-[30px] backdrop-filter bg-[rgba(236,72,153,0.3)] content-stretch flex items-start pb-[10px] pt-[8px] px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ec4899] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path"></g>
          <path clipRule="evenodd" d={svgPaths.pb876100} fillRule="evenodd" id="Path_2" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 8.5V7.5" id="Path_3" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 14.5V15.5" id="Path_4" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pcc35c00} id="Path_5" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <Group2 />
    </div>
  );
}

function ContentBlock1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Content block">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#e0e0e0] text-[12px] tracking-[0.5px] w-full">Get this buyer pre-approved</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e0e0e0] text-[14px] text-nowrap tracking-[0.5px]">
        <p className="leading-[1.5]">Mortgage</p>
      </div>
      <ContentBlock1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Container">
      <Icon />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="backdrop-blur-[30px] backdrop-filter bg-[rgba(134,239,172,0.3)] content-stretch flex items-start pb-[10px] pt-[8px] px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#86efac] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Group_2">
            <path clipRule="evenodd" d={svgPaths.p37be6380} fillRule="evenodd" id="Path" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M8 12.23H16" id="Path_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M8 15.23H16" id="Path_3" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M8 18H13" id="Path_4" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path clipRule="evenodd" d={svgPaths.pb346d00} fillRule="evenodd" id="Path_5" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <g id="Path_6"></g>
        </g>
      </svg>
    </div>
  );
}

function ContentBlock2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Content block">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] tracking-[0.5px] w-full">Get started</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap tracking-[0.5px]">
        <p className="leading-[1.5]">Buyer representation</p>
      </div>
      <ContentBlock2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Container">
      <Icon1 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="backdrop-blur-[30px] backdrop-filter bg-[#93c5fd] content-stretch flex items-start pb-[10px] pt-[8px] px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#93c5fd] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container2 />
      <Container5 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[16px] py-0 relative shrink-0 w-[698px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[13.263px]" data-name="User">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p39bc2c0} id="Path" stroke="var(--stroke-0, #CCFBF1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.42105" />
            <path clipRule="evenodd" d={svgPaths.p287a1380} fillRule="evenodd" id="Path_2" stroke="var(--stroke-0, #CCFBF1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.42105" />
          </g>
          <g id="Path_3"></g>
        </g>
      </svg>
    </div>
  );
}

function MediaIconFilledCheveronRight() {
  return (
    <div className="relative shrink-0 size-[14.105px]" data-name="Media / Icon / Filled / cheveron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Media / Icon / Filled / cheveron-right">
          <path clipRule="evenodd" d={svgPaths.p3b3e7a80} fill="var(--fill-0, #FDFDFD)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[rgba(19,78,74,0.2)] content-stretch flex gap-[5.895px] items-center justify-center overflow-clip px-[8.842px] py-[2.947px] relative rounded-[19.158px] shrink-0" data-name="Badge">
      <User />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ccfbf1] text-[14.737px] text-nowrap tracking-[0.7368px]">
        <p className="leading-[1.5]">Seller</p>
      </div>
      <MediaIconFilledCheveronRight />
    </div>
  );
}

function User1() {
  return (
    <div className="relative shrink-0 size-[13.263px]" data-name="User">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p39bc2c0} id="Path" stroke="var(--stroke-0, #CCFBF1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.42105" />
            <path clipRule="evenodd" d={svgPaths.p287a1380} fillRule="evenodd" id="Path_2" stroke="var(--stroke-0, #CCFBF1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.42105" />
          </g>
          <g id="Path_3"></g>
        </g>
      </svg>
    </div>
  );
}

function MediaIconFilledCheveronRight1() {
  return (
    <div className="relative shrink-0 size-[14.105px]" data-name="Media / Icon / Filled / cheveron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Media / Icon / Filled / cheveron-right">
          <path clipRule="evenodd" d={svgPaths.p3b3e7a80} fill="var(--fill-0, #FDFDFD)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[rgba(54,83,20,0.2)] content-stretch flex gap-[5.895px] items-center justify-center overflow-clip px-[8.842px] py-[2.947px] relative rounded-[19.158px] shrink-0" data-name="Badge">
      <User1 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ccfbf1] text-[14.737px] text-nowrap tracking-[0.7368px]">
        <p className="leading-[1.5]">Landlord</p>
      </div>
      <MediaIconFilledCheveronRight1 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[17.684px] items-start relative shrink-0">
      <Badge1 />
      <Badge2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Frame40 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[16px] py-0 relative shrink-0 w-[698px]" data-name="Container">
      <Container13 />
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron / Down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="basis-0 bg-[#2d2d2d] grow h-[40px] min-h-px min-w-px relative rounded-[5px] shrink-0">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[#bbb] text-[12px] text-nowrap tracking-[0.5px]">Menlo park high end</p>
          <ChevronDown2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b4b4b4] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[390px]">
      <Frame16 />
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative size-[16px]" data-name="Chevron / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron / Down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="basis-0 bg-[#2d2d2d] grow h-[40px] min-h-px min-w-px relative rounded-[5px] shrink-0">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[#bbb] text-[12px] text-nowrap tracking-[0.5px]">Search details</p>
          <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
            <div className="flex-none rotate-[270deg]">
              <ChevronDown3 />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b4b4b4] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[390px]">
      <Frame18 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#2d2d2d] content-stretch flex flex-col items-start overflow-clip px-[12px] py-[8px] relative rounded-[24px] shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[#bbb] text-[12px] text-nowrap tracking-[0.5px]">Activity</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#2d2d2d] content-stretch flex flex-col items-start overflow-clip px-[12px] py-[8px] relative rounded-[24px] shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[#bbb] text-[12px] text-nowrap tracking-[0.5px]">Recommended properties</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#5a5ff2] content-stretch flex flex-col items-start overflow-clip px-[12px] py-[8px] relative rounded-[24px] shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[#e0e0e0] text-[12px] text-nowrap tracking-[0.5px]">Transactions</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#2d2d2d] content-stretch flex flex-col items-start overflow-clip px-[12px] py-[8px] relative rounded-[24px] shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[#bbb] text-[12px] text-nowrap tracking-[0.5px]">Reminders</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#2d2d2d] content-stretch flex flex-col items-start overflow-clip px-[12px] py-[8px] relative rounded-[24px] shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic relative shrink-0 text-[#bbb] text-[12px] text-nowrap tracking-[0.5px]">Notes</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end overflow-clip pb-[4px] pl-0 pr-[16px] pt-0 relative shrink-0 w-[513px]">
      <Frame14 />
      <Frame17 />
      <Frame13 />
      <Frame19 />
      <Frame15 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[122.621px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] top-[0.36px] tracking-[0.6px] uppercase w-[123px]">Transactions (3)</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[13.999px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91637 6.99929H11.0822" id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16655" />
          <path d="M6.99929 2.91637V11.0822" id="Vector_2" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16655" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[95.561px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[48px] not-italic text-[#5a5ff2] text-[12px] text-center text-nowrap top-[0.36px] translate-x-[-50%]">New Transaction</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[113.558px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.999px] items-center relative size-full">
        <Icon2 />
        <Text1 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#121212] h-[40.987px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0px_0px_0.909px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.909px] pt-0 px-[15.994px] relative size-full">
          <Heading />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21.001px] relative shrink-0 w-[350px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#fdfdfd] text-[14px] text-nowrap top-[-0.18px]">742 Evergreen Terrace, Springfield</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[143.089px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] top-[0.36px] w-[144px]">Created on Nov 28, 2024</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[6.754px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.36px]">•</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[47.557px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.36px]">Offer #3</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center relative size-full">
        <Text2 />
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-[50px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#fdfdfd] text-[11px] text-nowrap">New Offer</p>
      </div>
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="h-[14px] relative shrink-0 w-[15px]" data-name="Chevron / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14">
        <g id="Chevron / Down">
          <path d={svgPaths.p2e10c300} id="Vector" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.06743" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(90,95,242,0.15)] h-[21.982px] relative rounded-[38px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] h-full items-center px-[10px] py-0 relative">
        <Paragraph1 />
        <ChevronDown4 />
      </div>
    </div>
  );
}

function AvatarBase() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[266.76px]" data-name="Avatar Base">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[266.76px] size-full" src={imgAvatarBase} />
      <div aria-hidden="true" className="absolute border border-[#2d2d2d] border-solid inset-[-0.5px] rounded-[267.26px]" />
    </div>
  );
}

function AvatarIcons() {
  return (
    <div className="relative shrink-0 size-[16.006px]" data-name="Avatar / Icons">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <AvatarBase />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#fdfdfd] text-[11px] text-nowrap">Any willams</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(18,18,18,0.9)] h-[21.982px] relative rounded-[38px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center px-[4px] py-0 relative">
        <AvatarIcons />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[43.8px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#5a5ff2] text-[12px] top-[0.36px] w-[44px]">12 docs</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18.448px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.p3ecca980} id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15291" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[24px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3px] h-full items-center relative">
        <Paragraph3 />
        <Icon3 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[23.999px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center relative size-full">
        <Container17 />
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[49.993px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.997px] items-start relative size-full">
        <Container16 />
        <Container20 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[82.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container21 />
    </div>
  );
}

function TransactionCard() {
  return (
    <div className="h-[115.888px] relative shrink-0 w-full" data-name="TransactionCard">
      <div aria-hidden="true" className="absolute border-[#27272a] border-[0px_0px_0.909px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[0.909px] pt-[15.994px] px-[20px] relative size-full">
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[21.001px] relative shrink-0 w-[350px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#fdfdfd] text-[14px] text-nowrap top-[-0.18px]">1640 Riverside Drive, Hill Valley</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[141.243px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] top-[0.36px] w-[142px]">Created on Nov 15, 2024</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[6.754px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.36px]">•</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[45.497px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.36px]">Offer #1</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center relative size-full">
        <Text5 />
        <Text6 />
        <Text7 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#fdfdfd] text-[11px] text-nowrap">Pending</p>
      </div>
    </div>
  );
}

function ChevronDown5() {
  return (
    <div className="h-[14px] relative shrink-0 w-[15px]" data-name="Chevron / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14">
        <g id="Chevron / Down">
          <path d={svgPaths.p2e10c300} id="Vector" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.06743" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[rgba(247,144,9,0.15)] h-[21.982px] relative rounded-[38px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] h-full items-center px-[10px] py-0 relative">
        <Paragraph5 />
        <ChevronDown5 />
      </div>
    </div>
  );
}

function AvatarBase1() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[266.76px]" data-name="Avatar Base">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[266.76px] size-full" src={imgAvatarBase} />
      <div aria-hidden="true" className="absolute border border-[#2d2d2d] border-solid inset-[-0.5px] rounded-[267.26px]" />
    </div>
  );
}

function AvatarIcons1() {
  return (
    <div className="relative shrink-0 size-[16.006px]" data-name="Avatar / Icons">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <AvatarBase1 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#fdfdfd] text-[11px] text-nowrap">Any willams</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[rgba(18,18,18,0.9)] h-[21.982px] relative rounded-[38px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center px-[4px] py-0 relative">
        <AvatarIcons1 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[18px] relative shrink-0 w-[40px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#5a5ff2] text-[12px] top-[0.33px] w-[40px]">8 docs</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18.448px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.p3ecca980} id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15291" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[24px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3px] h-full items-center relative">
        <Paragraph7 />
        <Icon4 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[23.999px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center relative size-full">
        <Container24 />
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[49.993px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.997px] items-start relative size-full">
        <Container23 />
        <Container27 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[82.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph4 />
      <Container28 />
    </div>
  );
}

function TransactionCard1() {
  return (
    <div className="h-[115.888px] relative shrink-0 w-full" data-name="TransactionCard">
      <div aria-hidden="true" className="absolute border-[#27272a] border-[0px_0px_0.909px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[0.909px] pt-[15.994px] px-[20px] relative size-full">
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[21.001px] relative shrink-0 w-[350px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#fdfdfd] text-[14px] text-nowrap top-[-0.18px]">221B Baker Street, London</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[141.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] top-[0.36px] w-[142px]">Created on Oct 30, 2024</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[6.754px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.36px]">•</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[47.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#a1a1a1] text-[12px] text-nowrap top-[0.36px]">Offer #2</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[17.997px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center relative size-full">
        <Text8 />
        <Text9 />
        <Text10 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#fdfdfd] text-[11px] text-nowrap">Rejected</p>
      </div>
    </div>
  );
}

function ChevronDown6() {
  return (
    <div className="h-[14px] relative shrink-0 w-[15px]" data-name="Chevron / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14">
        <g id="Chevron / Down">
          <path d={svgPaths.p2e10c300} id="Vector" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.06743" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[rgba(240,81,82,0.15)] h-[21.982px] relative rounded-[38px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[9px] h-full items-center px-[10px] py-0 relative">
        <Paragraph9 />
        <ChevronDown6 />
      </div>
    </div>
  );
}

function AvatarBase2() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-[266.76px]" data-name="Avatar Base">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[266.76px] size-full" src={imgAvatarBase} />
      <div aria-hidden="true" className="absolute border border-[#2d2d2d] border-solid inset-[-0.5px] rounded-[267.26px]" />
    </div>
  );
}

function AvatarIcons2() {
  return (
    <div className="relative shrink-0 size-[16.006px]" data-name="Avatar / Icons">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <AvatarBase2 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#fdfdfd] text-[11px] text-nowrap">Any willams</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[rgba(18,18,18,0.9)] h-[21.982px] relative rounded-[38px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center px-[4px] py-0 relative">
        <AvatarIcons2 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[40px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#5a5ff2] text-[12px] top-[0.33px] w-[40px]">2 docs</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18.448px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.p3ecca980} id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15291" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[24px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3px] h-full items-center relative">
        <Paragraph11 />
        <Icon5 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[23.999px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center relative size-full">
        <Container31 />
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[49.993px] relative shrink-0 w-[350px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.997px] items-start relative size-full">
        <Container30 />
        <Container34 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[82.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph8 />
      <Container35 />
    </div>
  );
}

function TransactionCard2() {
  return (
    <div className="h-[115.888px] relative shrink-0 w-full" data-name="TransactionCard">
      <div aria-hidden="true" className="absolute border-[#27272a] border-[0px_0px_0.909px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[0.909px] pt-[15.994px] px-[20px] relative size-full">
          <Container36 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col h-[347.663px] items-start relative shrink-0 w-full" data-name="Container">
      <TransactionCard />
      <TransactionCard1 />
      <TransactionCard2 />
    </div>
  );
}

function BuyerProfile() {
  return (
    <div className="content-stretch flex flex-col gap-[0.909px] h-[389.56px] items-start relative shrink-0 w-full" data-name="BuyerProfile">
      <Container15 />
      <Container37 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col gap-[16px] items-start left-0 pb-0 pt-[9px] px-0 top-[54px] w-[390px]">
      <Frame35 />
      <Container11 />
      <Container14 />
      <Frame37 />
      <Frame38 />
      <Frame36 />
      <BuyerProfile />
    </div>
  );
}

export default function BuyerProfile1() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="Buyer Profile">
      <div className="absolute bottom-0 h-[1091px] left-0 pointer-events-none top-0">
        <Frame25 />
      </div>
      <Frame20 />
    </div>
  );
}