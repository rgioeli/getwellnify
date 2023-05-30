import { NextPage } from "next";

interface PropOptions {
  margin: string;
}

//! I made this component strictly to identify where a Spacer is in the code
const Spacer: NextPage<PropOptions> = ({ margin }): JSX.Element => {
  return <div className={margin}></div>;
};

export default Spacer;
