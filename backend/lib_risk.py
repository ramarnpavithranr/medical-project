import math
from typing import Dict, Any

def calculate_risk_assessment(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Standard ACC/AHA ASCVD Pooled Cohort Equations (2013/2018 Guidelines)
    """
    age = float(input_data.get("age", 50))
    sex = str(input_data.get("sex", "male")).lower()
    sbp = float(input_data.get("systolic_bp", 120))
    tot_chol = float(input_data.get("total_cholesterol", 190))
    hdl = float(input_data.get("hdl_cholesterol", 50))
    is_smoker = bool(input_data.get("is_smoker", False))
    has_diabetes = bool(input_data.get("has_diabetes", False))
    on_meds = bool(input_data.get("on_hypertension_meds", False))

    ln_age = math.log(max(20.0, min(79.0, age)))
    ln_tot = math.log(max(130.0, min(320.0, tot_chol)))
    ln_hdl = math.log(max(20.0, min(100.0, hdl)))
    ln_sbp = math.log(max(90.0, min(200.0, sbp)))

    if sex == "male":
        ind_sum = (
            12.344 * ln_age +
            11.853 * ln_tot -
            2.664 * (ln_age * ln_tot) -
            7.990 * ln_hdl +
            1.769 * (ln_age * ln_hdl) +
            (1.797 * ln_sbp if on_meds else 1.764 * ln_sbp) +
            (7.837 - 1.795 * ln_age if is_smoker else 0.0) +
            (0.658 if has_diabetes else 0.0)
        )
        mean_x = 61.18
        baseline_surv = 0.9144
    else:
        ind_sum = (
            -29.799 * ln_age +
            4.884 * (ln_age ** 2) +
            13.540 * ln_tot -
            3.114 * (ln_age * ln_tot) -
            13.578 * ln_hdl +
            3.149 * (ln_age * ln_hdl) +
            (2.019 * ln_sbp if on_meds else 1.957 * ln_sbp) +
            (7.574 - 1.665 * ln_age if is_smoker else 0.0) +
            (0.661 if has_diabetes else 0.0)
        )
        mean_x = -29.18
        baseline_surv = 0.9665

    raw_risk = 1.0 - math.pow(baseline_surv, math.exp(ind_sum - mean_x))
    pct = max(0.1, min(99.9, round(raw_risk * 100.0, 1)))

    if pct < 5.0:
        cat = "Low"
    elif pct < 7.5:
        cat = "Borderline"
    elif pct < 20.0:
        cat = "Intermediate"
    else:
        cat = "High"

    return {
        "score_name": "ACC/AHA 10-Year ASCVD Risk Score",
        "category": cat,
        "estimated_10yr_risk": f"{pct}% 10-year risk of major atherosclerotic cardiovascular event (MACE)",
        "factors_considered": [
            f"Age {int(age)}",
            f"Systolic BP {int(sbp)} mmHg",
            f"Total Chol {int(tot_chol)} mg/dL",
            f"HDL {int(hdl)} mg/dL",
            "Smoker" if is_smoker else "Non-Smoker",
            "Diabetic" if has_diabetes else "Non-Diabetic",
            "Antihypertensive Tx" if on_meds else "No BP Meds"
        ]
    }
