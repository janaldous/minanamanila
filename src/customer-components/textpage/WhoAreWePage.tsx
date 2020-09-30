import React from "react";
import { TextPage } from "./TextPage";

export const WhoAreWePage: React.FC<{}> = () => {
  return (
    <TextPage
      title="About us"
      sections={[
        {
          title: "Who are we",
          text: [
            "Our goal is to promote sustainable fashion directly and indirectly by addressing the negative externalities brought about by fast fashion in developing countries. With this, we will address the 12th Sustainable Development Goal of “responsible consumption and production”, in order to tackle this problem from both the consumer and the producer’s point of view when shopping for clothes and other fashion items. Our long term vision of this idea is to make UPCYCLED FASHION the next big thing and to transform current production and consumption behaviors to be more sustainable. To do this, we are proposing a digital platform for ukay-ukays in the Philippines to enhance their competitiveness and put pressure on the fast fashion industry to be more sustainable. It goes without saying that fast fashion retailers are strong competition for ukay-ukays, adapting JIT Manufacturing, scarcity marketing, and cost leadership strategies that appeal to the market of 15 - 29 year olds the most. With the proven success of these strategies and the impending rise of conscious consumerism, we plan to adapt similar strategies used by fast fashion retailers but geared towards sustainable behavior.",
            "With this, Minana seeks to achieve the following objectives:\n * To push people to be more mindful with their shopping decisions and the environmental impact it has on the world.\n * To advocate to be more responsible consumers and producers.\n * To reduce the environmental consequences of the fast fashion industry.\n * To put pressure on fast fashion businesses to push for sustainable clothing and fashion practices for their consumers, as more people will be shifting their attention to and supporting thrifted clothes/alternatives."
          ],
        },
      ]}
    />
  );
};
