import svgPaths from "./svg-5peybmey94";
import imgImageVioletCole from "figma:asset/425014815828544c6be381aa86661be1b4dad5c3.png";
import imgFrame48095736 from "figma:asset/d7d67b5128bc6f8ac8cb935a198bf8ce38ac8f0c.png";

function Time() {
  return (
    <div className="-translate-y-1/2 absolute h-[54px] left-0 right-[64.89%] top-1/2" data-name="Time">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[33.96%_36.76%_25.3%_36.96%] leading-[22px] not-italic text-[#fdfdfd] text-[17px] text-center">9:41</p>
    </div>
  );
}

function Battery() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[33.33%] contents left-[calc(50%+24.71px)] top-[42.59%]" data-name="Battery">
      <div className="-translate-x-1/2 absolute border border-[#fdfdfd] border-solid bottom-[33.33%] left-[calc(50%+23.55px)] opacity-35 rounded-[4.3px] top-[42.59%] w-[25px]" data-name="Border" />
      <div className="-translate-x-1/2 absolute bottom-[41.01%] left-[calc(50%+37.71px)] top-[51.45%] w-[1.328px]" data-name="Cap">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.32804 4.07547">
          <path d={svgPaths.p193f1400} fill="var(--fill-0, #FDFDFD)" id="Cap" opacity="0.4" />
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#fdfdfd] bottom-[37.04%] left-[calc(50%+23.55px)] rounded-[2.5px] top-[46.3%] w-[21px]" data-name="Capacity" />
    </div>
  );
}

function Levels() {
  return (
    <div className="-translate-y-1/2 absolute h-[54px] left-[63.61%] right-0 top-1/2" data-name="Levels">
      <Battery />
      <div className="-translate-x-1/2 absolute bottom-[33.4%] left-[calc(50%-4.68px)] top-[43.77%] w-[17.142px]" data-name="Wifi">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1417 12.3283">
          <path clipRule="evenodd" d={svgPaths.p1fac3f80} fill="var(--fill-0, #FDFDFD)" fillRule="evenodd" id="Wifi" />
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute bottom-[33.77%] left-[calc(50%-30.35px)] top-[43.58%] w-[19.2px]" data-name="Cellular Connection">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2 12.2264">
          <path clipRule="evenodd" d={svgPaths.p1e09e400} fill="var(--fill-0, #FDFDFD)" fillRule="evenodd" id="Cellular Connection" />
        </svg>
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

function Frame43() {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col items-start pointer-events-auto sticky top-0">
      <StatusBarIPhone />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[17.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.74705 11.9948">
            <path d={svgPaths.p29b9f400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49935" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.75px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9948 1.49935">
            <path d="M11.2451 0.749673H0.749673" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49935" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[17.992px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function ImageVioletCole() {
  return (
    <div className="h-[39.998px] relative shrink-0 w-full" data-name="Image (Violet Cole)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageVioletCole} />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#2d2d2d] relative rounded-[22269600px] shrink-0 size-[39.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageVioletCole />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[22.493px] left-[0.01px] top-[12px] w-[122.741px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[15px] text-white top-[-1.01px] tracking-[0.0656px]">Violet Cole</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] h-[46.8px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[46.8px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.995px] items-center relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9966 16.9966">
        <g clipPath="url(#clip0_112_1878)" id="Icon">
          <path d={svgPaths.p29dcf00} id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41638" />
          <path d={svgPaths.p360d34a0} id="Vector_2" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41638" />
        </g>
        <defs>
          <clipPath id="clip0_112_1878">
            <rect fill="white" height="16.9966" width="16.9966" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(74,79,210,0.2)] relative rounded-[22269600px] shrink-0 size-[35.995px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#5a5ff2] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[22269600px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.664px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9966 16.9966">
        <g clipPath="url(#clip0_112_1875)" id="Icon">
          <path d={svgPaths.p7f80b00} id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41638" />
        </g>
        <defs>
          <clipPath id="clip0_112_1875">
            <rect fill="white" height="16.9966" width="16.9966" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(74,79,210,0.2)] relative rounded-[22269600px] shrink-0 size-[35.995px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#5a5ff2] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[22269600px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.664px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9966 16.9966">
        <g clipPath="url(#clip0_112_1943)" id="Icon">
          <path d={svgPaths.p25aa1800} id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41638" />
        </g>
        <defs>
          <clipPath id="clip0_112_1943">
            <rect fill="white" height="16.9966" width="16.9966" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(74,79,210,0.2)] flex-[1_0_0] h-[35.995px] min-h-px min-w-px relative rounded-[22269600px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#5a5ff2] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[22269600px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.664px] relative size-full">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[35.995px] relative shrink-0 w-[123.975px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.995px] items-start relative size-full">
        <Button1 />
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[46.8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9.997px] items-center relative size-full">
          <Button />
          <Container2 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(12,74,110,0.3)] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[13px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e0f2fe] text-[12px] tracking-[0.5px] whitespace-nowrap">
        <p className="leading-[1.5]">Buyer</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[rgba(19,78,74,0.2)] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[13px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ccfbf1] text-[12px] tracking-[0.5px] whitespace-nowrap">
        <p className="leading-[1.5]">Seller</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[rgba(54,83,20,0.2)] content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[13px] shrink-0" data-name="Badge">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d1fae5] text-[12px] tracking-[0.5px] whitespace-nowrap">
        <p className="leading-[1.5]">Landlord</p>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <Badge />
      <Badge1 />
      <Badge2 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[19.994px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33226 3.33226">
            <path d={svgPaths.p2f781400} id="Vector" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66613" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33226 3.33226">
            <path d={svgPaths.p2f781400} id="Vector" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66613" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33226 3.33226">
            <path d={svgPaths.p2f781400} id="Vector" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66613" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[19.994px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Frame55 />
      <Button4 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[11.998px] items-start pb-[12px] pt-[11.998px] px-[11.998px] relative w-full">
        <Container1 />
        <Container6 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[19.994px] relative shrink-0 w-[71.45px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[36px] not-italic text-[#86efac] text-[14px] text-center top-[0.99px] tracking-[-0.1504px]">New Client</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9907 15.9907">
        <g id="Icon">
          <path d={svgPaths.pa7efee0} id="Vector" stroke="var(--stroke-0, #86EFAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33256" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#1e3a1e] flex-[1_0_0] h-[34px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2d4a2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[12.662px] pr-[12.664px] py-[0.664px] relative size-full">
          <Text />
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[33.309px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function ImageVioletCole1() {
  return (
    <div className="h-[18.004px] relative shrink-0 w-full" data-name="Image (Violet Cole)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageVioletCole} />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#2d2d2d] content-stretch flex flex-col items-start overflow-clip relative rounded-[10024117px] shrink-0 size-[18.004px]" data-name="Container">
      <ImageVioletCole1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[87px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic right-[43.67px] text-[#b0b0b0] text-[14px] text-center top-[0.99px] tracking-[-0.1504px] translate-x-1/2">Monica Miller</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="relative shrink-0 w-[197.844px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container10 />
        <Text1 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9907 15.9907">
        <g id="Icon">
          <path d={svgPaths.pa7efee0} id="Vector" stroke="var(--stroke-0, #B0B0B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33256" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#252525] h-[34px] relative rounded-[10px] shrink-0 w-[332px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#252525] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[12.662px] pr-[12.664px] py-[0.664px] relative size-full">
        <Frame53 />
        <Icon6 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[33.309px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[11.998px] relative w-full">
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start py-[10px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-solid border-t-[0.664px] inset-0 pointer-events-none" />
      <Button5 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.994px] relative shrink-0 w-[96.764px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[48px] not-italic text-[14px] text-center text-white top-[0.99px] tracking-[-0.1504px]">AI Prospecting</p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Text2 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Frame50 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute contents inset-0" data-name="Container">
      <div className="absolute bg-[#22c55e] inset-0 rounded-[20.386px]" data-name="Background" />
      <div className="absolute bg-white inset-[6.25%_3.85%_6.25%_42.31%] rounded-[55.852px]" data-name="Knob" />
    </div>
  );
}

function FormControlToggleSwitch() {
  return (
    <div className="h-[17.873px] relative shrink-0 w-[29.043px]" data-name="Form Control / Toggle Switch">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[19.994px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Frame51 />
        <FormControlToggleSwitch />
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[39.987px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[11.998px] relative size-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[0.664px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-solid border-t-[0.664px] inset-0 pointer-events-none" />
      <Button8 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.994px] relative shrink-0 w-[115.502px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[58.5px] not-italic text-[14px] text-center text-white top-[0.99px] tracking-[-0.1504px]">Additional Details</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9907 15.9907">
        <g id="Icon">
          <path d={svgPaths.pa7efee0} id="Vector" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33256" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[39.987px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-solid border-t-[0.664px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-[0.664px] px-[11.998px] relative size-full">
          <Text3 />
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.994px] relative shrink-0 w-[115.502px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[14px] text-center text-white top-[0.99px] tracking-[-0.1504px]">Tags</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9907 15.9907">
        <g id="Icon">
          <path d={svgPaths.pa7efee0} id="Vector" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33256" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[39.987px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-solid border-t-[0.664px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-[0.664px] px-[11.998px] relative size-full">
          <Text4 />
          <Icon8 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[19.994px] relative shrink-0 w-[115.502px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[43.99px] not-italic text-[14px] text-center text-white top-[0.99px] tracking-[-0.1504px]">Relationships</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9907 15.9907">
        <g id="Icon">
          <path d={svgPaths.pa7efee0} id="Vector" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33256" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[39.987px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-solid border-t-[0.664px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-[0.664px] px-[11.998px] relative size-full">
          <Text5 />
          <Icon9 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[19.994px] relative shrink-0 w-[115.502px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[44.5px] not-italic text-[14px] text-center text-white top-[0.99px] tracking-[-0.1504px]">Collaborators</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[15.991px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9907 15.9907">
        <g id="Icon">
          <path d={svgPaths.pa7efee0} id="Vector" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33256" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[39.987px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-solid border-t-[0.664px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-[0.664px] px-[11.998px] relative size-full">
          <Text6 />
          <Icon10 />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full">
      <Container />
      <Container7 />
      <Container11 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function ClientHeader() {
  return (
    <div className="bg-[#1a1a1a] relative rounded-[16px] shrink-0 w-[358px]" data-name="ClientHeader">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[4px] pt-px px-px relative rounded-[inherit] w-full">
        <Frame52 />
      </div>
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
          <ClientHeader />
        </div>
      </div>
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
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#fdfdfd] text-[12px] tracking-[0.5px] w-full whitespace-pre-wrap">Mel, summarize Violet Cole</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#fdfdfd] text-[14px] tracking-[0.5px] whitespace-nowrap">
        <p className="leading-[1.5]">AI summary</p>
      </div>
      <ContentBlock />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Container">
      <Frame />
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="backdrop-blur-[30px] bg-[rgba(236,72,153,0.3)] content-stretch flex items-start pb-[10px] pt-[8px] px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ec4899] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container18 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path clipRule="evenodd" d={svgPaths.pb876100} fillRule="evenodd" id="Path_2" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 8.5V7.5" id="Path_3" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 14.5V15.5" id="Path_4" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pcc35c00} id="Path_5" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <Group />
    </div>
  );
}

function ContentBlock1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Content block">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#e0e0e0] text-[12px] tracking-[0.5px] w-full whitespace-pre-wrap">Get this buyer pre-approved</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e0e0e0] text-[14px] tracking-[0.5px] whitespace-nowrap">
        <p className="leading-[1.5]">Mortgage</p>
      </div>
      <ContentBlock1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Container">
      <Icon11 />
      <Container22 />
    </div>
  );
}

function Container20() {
  return (
    <div className="backdrop-blur-[30px] bg-[rgba(134,239,172,0.3)] content-stretch flex items-start pb-[10px] pt-[8px] px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#86efac] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container21 />
    </div>
  );
}

function Icon12() {
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
          <g id="Path_6" />
        </g>
      </svg>
    </div>
  );
}

function ContentBlock2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0" data-name="Content block">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] tracking-[0.5px] w-full whitespace-pre-wrap">Get started</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] tracking-[0.5px] whitespace-nowrap">
        <p className="leading-[1.5]">Buyer representation</p>
      </div>
      <ContentBlock2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Container">
      <Icon12 />
      <Container25 />
    </div>
  );
}

function Container23() {
  return (
    <div className="backdrop-blur-[30px] bg-[#93c5fd] content-stretch flex items-start pb-[10px] pt-[8px] px-[12px] relative rounded-[12px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#93c5fd] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container24 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container17 />
      <Container20 />
      <Container23 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[16px] relative shrink-0 w-[698px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#5a5ff2] relative rounded-[22269600px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.1504px]">Recommended properties</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-[#1a1a1a] h-[37.312px] relative rounded-[22269600px] shrink-0 w-[103.556px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[22269600px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[52.15px] not-italic text-[#8a8a8a] text-[14px] text-center top-[9.65px] tracking-[-0.1504px]">Reminders</p>
      </div>
    </div>
  );
}

function TabNavigation() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[37.312px] items-start overflow-clip relative shrink-0 w-[358.018px]" data-name="TabNavigation">
      <Button13 />
      <Button14 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[16px] relative shrink-0 w-[698px]" data-name="Container">
      <TabNavigation />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-0 size-[15.991px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9907 15.9907">
        <g clipPath="url(#clip0_112_1872)" id="Icon">
          <path d={svgPaths.p1b44a700} id="Vector" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33256" />
        </g>
        <defs>
          <clipPath id="clip0_112_1872">
            <rect fill="white" height="15.9907" width="15.9907" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[19.994px] relative shrink-0 w-[55.542px]" data-name="Button">
      <Icon13 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[38.98px] not-italic text-[#5a5ff2] text-[14px] text-center top-[0.99px] tracking-[-0.1504px]">Filter</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#6a6a6a] text-[12px] tracking-[0.6px] uppercase">recommended (5)</p>
      <Button15 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-full relative rounded-[8px] shrink-0 w-[80px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-[#fdfdfd] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgFrame48095736} />
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">bds</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">ba</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">2,208</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">sqft</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame28 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame31 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame32 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.35] not-italic relative shrink-0 text-[#fdfdfd] text-[10px] tracking-[0.5px]">$ 1,200,000</p>
      <Frame13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[206px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic overflow-hidden relative shrink-0 text-[#fdfdfd] text-[12px] text-ellipsis tracking-[0.5px] w-[192px] whitespace-nowrap">456 Oak Avenue</p>
      <Frame15 />
    </div>
  );
}

function ArrowsDiagramsArrow() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrows, Diagrams/Arrow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d="M10 16L14 12L10 8" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Path_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[8px] h-[54px] items-center relative shrink-0">
      <Frame8 />
      <Frame14 />
      <ArrowsDiagramsArrow />
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#252525] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#86efac] text-[12px]">1640 Riverside Drive, Hill Valley · Rent</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[15.991px] relative shrink-0 w-[38.701px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a6a6a] text-[12px] top-[0.66px]">2h ago</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[325px]">
      <Frame56 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 325 1">
            <path d="M0 0.5H325" id="Vector 16" stroke="var(--stroke-0, #2D2D2D)" />
          </svg>
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[#1a1a1a] h-[134px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Frame44 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-full relative rounded-[8px] shrink-0 w-[80px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-[#fdfdfd] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgFrame48095736} />
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">bds</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">ba</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">2,208</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">sqft</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame29 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame33 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame34 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.35] not-italic relative shrink-0 text-[#fdfdfd] text-[10px] tracking-[0.5px]">$ 1,200,000</p>
      <Frame18 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[206px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic overflow-hidden relative shrink-0 text-[#fdfdfd] text-[12px] text-ellipsis tracking-[0.5px] w-[192px] whitespace-nowrap">456 Oak Avenue</p>
      <Frame17 />
    </div>
  );
}

function ArrowsDiagramsArrow1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrows, Diagrams/Arrow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d="M10 16L14 12L10 8" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Path_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[8px] h-[54px] items-center relative shrink-0">
      <Frame9 />
      <Frame16 />
      <ArrowsDiagramsArrow1 />
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[#252525] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#86efac] text-[12px]">1640 Riverside Drive, Hill Valley · Rent</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[15.991px] relative shrink-0 w-[38.701px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a6a6a] text-[12px] top-[0.66px]">2h ago</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[325px]">
      <Frame57 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 325 1">
            <path d="M0 0.5H325" id="Vector 16" stroke="var(--stroke-0, #2D2D2D)" />
          </svg>
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#1a1a1a] h-[134px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Frame45 />
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-full relative rounded-[8px] shrink-0 w-[80px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-[#fdfdfd] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgFrame48095736} />
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">bds</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">ba</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">2,208</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">sqft</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame30 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame35 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame36 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.35] not-italic relative shrink-0 text-[#fdfdfd] text-[10px] tracking-[0.5px]">$ 1,200,000</p>
      <Frame21 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[206px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic overflow-hidden relative shrink-0 text-[#fdfdfd] text-[12px] text-ellipsis tracking-[0.5px] w-[192px] whitespace-nowrap">456 Oak Avenue</p>
      <Frame20 />
    </div>
  );
}

function ArrowsDiagramsArrow2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrows, Diagrams/Arrow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d="M10 16L14 12L10 8" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Path_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[8px] h-[54px] items-center relative shrink-0">
      <Frame10 />
      <Frame19 />
      <ArrowsDiagramsArrow2 />
    </div>
  );
}

function Text11() {
  return (
    <div className="bg-[#252525] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#86efac] text-[12px]">1640 Riverside Drive, Hill Valley · Rent</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[15.991px] relative shrink-0 w-[38.701px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a6a6a] text-[12px] top-[0.66px]">2h ago</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[325px]">
      <Frame58 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 325 1">
            <path d="M0 0.5H325" id="Vector 16" stroke="var(--stroke-0, #2D2D2D)" />
          </svg>
        </div>
      </div>
      <Frame3 />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#1a1a1a] h-[134px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Frame46 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-full relative rounded-[8px] shrink-0 w-[80px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-[#fdfdfd] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgFrame48095736} />
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">bds</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">ba</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">2,208</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">sqft</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame37 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame38 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame39 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.35] not-italic relative shrink-0 text-[#fdfdfd] text-[10px] tracking-[0.5px]">$ 1,200,000</p>
      <Frame24 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[206px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic overflow-hidden relative shrink-0 text-[#fdfdfd] text-[12px] text-ellipsis tracking-[0.5px] w-[192px] whitespace-nowrap">456 Oak Avenue</p>
      <Frame23 />
    </div>
  );
}

function ArrowsDiagramsArrow3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrows, Diagrams/Arrow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d="M10 16L14 12L10 8" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Path_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex gap-[8px] h-[54px] items-center relative shrink-0">
      <Frame11 />
      <Frame22 />
      <ArrowsDiagramsArrow3 />
    </div>
  );
}

function Text13() {
  return (
    <div className="bg-[#252525] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#86efac] text-[12px]">1640 Riverside Drive, Hill Valley · Rent</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[15.991px] relative shrink-0 w-[38.701px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a6a6a] text-[12px] top-[0.66px]">2h ago</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[325px]">
      <Frame59 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 325 1">
            <path d="M0 0.5H325" id="Vector 16" stroke="var(--stroke-0, #2D2D2D)" />
          </svg>
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#1a1a1a] h-[134px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Frame47 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-full relative rounded-[8px] shrink-0 w-[80px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
        <div className="absolute bg-[#fdfdfd] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgFrame48095736} />
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">bds</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">ba</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[2px] items-center leading-[1.35] not-italic relative shrink-0 text-[10px] tracking-[0.5px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#fdfdfd]">2,208</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#c1c1d7]">sqft</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame40 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame41 />
      <div className="flex h-[8px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "323.171875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[8px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 21" stroke="var(--stroke-0, #41446A)" x2="8" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame42 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.35] not-italic relative shrink-0 text-[#fdfdfd] text-[10px] tracking-[0.5px]">$ 1,200,000</p>
      <Frame27 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[206px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.35] not-italic overflow-hidden relative shrink-0 text-[#fdfdfd] text-[12px] text-ellipsis tracking-[0.5px] w-[192px] whitespace-nowrap">456 Oak Avenue</p>
      <Frame26 />
    </div>
  );
}

function ArrowsDiagramsArrow4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrows, Diagrams/Arrow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path d="M10 16L14 12L10 8" id="Path" stroke="var(--stroke-0, #5A5FF2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Path_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[8px] h-[54px] items-center relative shrink-0">
      <Frame12 />
      <Frame25 />
      <ArrowsDiagramsArrow4 />
    </div>
  );
}

function Text15() {
  return (
    <div className="bg-[#252525] content-stretch flex items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#86efac] text-[12px]">1640 Riverside Drive, Hill Valley · Rent</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[15.991px] relative shrink-0 w-[38.701px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a6a6a] text-[12px] top-[0.66px]">2h ago</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[325px]">
      <Frame60 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 325 1">
            <path d="M0 0.5H325" id="Vector 16" stroke="var(--stroke-0, #2D2D2D)" />
          </svg>
        </div>
      </div>
      <Frame5 />
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#1a1a1a] h-[134px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2d2d2d] border-[0.664px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Frame49 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[23.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9964 23.9964">
        <g id="Icon">
          <path d="M4.99926 11.9982H18.9972" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49963" />
          <path d="M11.9982 4.99926V18.9972" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.49963" />
        </g>
      </svg>
    </div>
  );
}

function NotesTab1() {
  return (
    <div className="absolute bg-[#5a5ff2] content-stretch flex items-center justify-center right-0 rounded-[22269600px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[55.999px] top-[730.89px]" data-name="NotesTab">
      <Icon14 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[11.998px] h-[791px] items-start relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <NotesTab1 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-start left-[15.99px] top-0 w-[358.009px]">
      <Heading1 />
      <Container27 />
    </div>
  );
}

function NotesTab() {
  return (
    <div className="h-[606px] relative shrink-0 w-full" data-name="NotesTab">
      <Frame48 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col gap-[16px] h-[1298px] items-start left-0 pt-[9px] top-[54px] w-[390px]">
      <Frame6 />
      <Container14 />
      <Container26 />
      <NotesTab />
    </div>
  );
}

export default function RecommendedProperties() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="Recommended properties">
      <div className="absolute bottom-0 h-[1226px] left-0 pointer-events-none top-0">
        <Frame43 />
      </div>
      <Frame7 />
    </div>
  );
}