/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { HealthCheckRating } from "../../../../types";

/* eslint-disable @typescript-eslint/no-unused-vars */
const [heathCheckRating, setHeathCheckRating] = useState<
  HealthCheckRating | undefined
>(undefined);
const [checkDischarge, setCheckDischarge] = useState<boolean>(false);
