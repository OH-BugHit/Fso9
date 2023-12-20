/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { HealthCheckRating, SickLeave } from "../../../../types";

/* eslint-disable @typescript-eslint/no-unused-vars */
const [heathCheckRating, setHeathCheckRating] = useState<
  HealthCheckRating | undefined
>(undefined);
const [employerName, setEmployerName] = useState<string>("");
const [sickLeave, setSickLeave] = useState<SickLeave | undefined>(undefined);
const [checkDischarge, setCheckDischarge] = useState<boolean>(false);
