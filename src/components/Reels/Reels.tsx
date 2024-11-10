const Reels = () => {


    

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "full",
        scrollSnapType: "y",
      }}
    >
      {}
    </div>
  );
};

const ReelComponent = ({
  reel,
  advanceToNextReel,
}: {
  reel: any;
  advanceToNextReel: any;
}) => {
  return (
    <div className="w-[350px] h-[600px] relative  rounded-md bg-black">
      <video
        onClick={(e) => {
          if (e.currentTarget.paused) {
            e.currentTarget.play();
          } else {
            e.currentTarget.pause();
          }
        }}
        className="w-full  rounded-md  h-full"
        autoPlay
        onEnded={(e) => e.currentTarget.pause()}
        src={reel?.url}
      />
    </div>
  );
};

export default Reels;
