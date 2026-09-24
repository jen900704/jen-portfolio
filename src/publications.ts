export type Publication = {
  title: string;
  authors: string;
  status: string;
  kind: string;
  links?: { label: string; href: string }[];
  highlight?: string;
  figure?: { src: string; alt: string; caption: string; width: number; height: number };
};

export const publications: Publication[] = [
  {
    "title": "Disentangling the Interpretive and Predictive Roles of LIWC: Controlled Substitution in Depression-Related Classification.",
    "authors": "Hsiang-Chen Yeh, Xiutian Zhao, Aurosweta Mahapatra, Shreeram Suresh Chandra, Ryan L. Boyd, and Berrak Sisman",
    "status": "EMNLP 2026, Main Conference.",
    "kind": "published",
    "links": [
      {
        "label": "PDF",
        "href": "https://arxiv.org/pdf/2607.22952"
      },
      {
        "label": "Code",
        "href": "https://github.com/jen900704/liwc-controlled-substitution"
      }
    ],
    "highlight": "Controlled substitutions test whether LIWC adds predictive value beyond existing speech and language representations.",
    "figure": {
      "src": "research/emnlp-figure.png",
      "alt": "Four LIWC conditions: intact, PCA-rotated, participant-shuffled, and random-marginal, with the properties preserved by each control.",
      "caption": "Controlled substitution · Figure 2",
      "width": 860,
      "height": 984
    }
  },
  {
    "title": "Who is Speaking or Who is Depressed? A Controlled Study of Speaker Leakage in Speech-Based Depression Detection.",
    "authors": "Hsiang-Chen Yeh, Luqi Sun, Aurosweta Mahapatra, Shreeram Suresh Chandra, Emily Mower Provost, and Berrak Sisman",
    "status": "Interspeech 2026.",
    "kind": "published",
    "links": [
      {
        "label": "PDF",
        "href": "https://arxiv.org/pdf/2604.14354"
      },
      {
        "label": "Code",
        "href": "https://github.com/jen900704/Speech-Depression-Speaker-Leakage"
      }
    ],
    "highlight": "Keeping training size fixed reveals how speaker overlap can inflate depression-detection performance.",
    "figure": {
      "src": "research/interspeech-figure.png",
      "alt": "Size-matched speaker-independent and speaker-overlapped training sets evaluated on the same test speakers.",
      "caption": "Speaker-overlap control · Figure 1",
      "width": 736,
      "height": 552
    }
  },
  {
    "title": "Scam-Based Human Trafficking Through a Trauma-Informed and Intersectional Lens: An Integrative Narrative Review.",
    "authors": "Hsiang-Chen Yeh, Siqi Liu, and Tamar Rodney",
    "status": "Trauma, Violence, & Abuse (2026, in press).",
    "kind": "published",
    "links": [
      {
        "label": "DOI",
        "href": "https://doi.org/10.1177/15248380261487139"
      }
    ]
  },
  {
    "title": "Linguistic Features of Prosocial Lying: A Computerized Text Analysis.",
    "authors": "Yueh-Che Hsieh, Hsiang-Chen Yeh, Chou-Ying Chen, and Chien Huang",
    "status": "Peer-reviewed poster, Annual Conference of the Taiwan Association of Clinical Psychology, 2023.",
    "kind": "poster",
    "links": [
      {
        "label": "Poster",
        "href": "https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/04以電腦化字詞分析探討利社會說謊語言風格.pdf"
      }
    ]
  },
  {
    "title": "Word-Aligned Prosody Reflects Speaker Differences More Than Depression or PTSD Severity.",
    "authors": "Hsiang-Chen Yeh, Aurosweta Mahapatra, Shreeram Suresh Chandra, Ryan L. Boyd, and Berrak Sisman",
    "status": "Submitted to ICASSP 2027.",
    "kind": "review"
  },
  {
    "title": "When Memories Become Visible: Externalizing Music-Evoked Autobiographical Memories with Generative AI.",
    "authors": "Yancheng Cao, Jingyi Chen, Hsiang-Chen Yeh (co-second author), Ruonan Fan, Anlan Wang, and Jiangtao Gong",
    "status": "Under review at CHI 2027.",
    "kind": "review"
  },
  {
    "title": "Speech Representation Model for Computational Mental Health.",
    "authors": "Hsiang-Chen Yeh and H. Andrew Schwartz",
    "status": "Target: ACL 2027.",
    "kind": "preparation"
  },
  {
    "title": "Attribution in the Wild: A Large-Scale Computational Analysis of Everyday Causal Explanation.",
    "authors": "Hsiang-Chen Yeh, Adam K. Fetterman, and Ryan L. Boyd",
    "status": "Target: Communications Psychology.",
    "kind": "preparation"
  },
  {
    "title": "Onset Timing, Diagnostic Delay, and Narrative Language in Adults With Self-Reported Borderline Personality Disorder.",
    "authors": "Hsiang-Chen Yeh, Allison Lahnala, and Vasudha Varadarajan",
    "status": "Target: JMIR Mental Health.",
    "kind": "preparation"
  },
  {
    "title": "ShapeKit for Label-Free Failure Triage in Complex Organ Segmentation.",
    "authors": "Koushik Swarna, Wenxuan Li, Hsiang-Chen Yeh, and Zongwei Zhou",
    "status": "Target: MICCAI.",
    "kind": "preparation"
  },
  {
    "title": "An Investigation of the Relationship Between Mental Health Providers' Social Attitudes and Their Self-Reported Broaching Orientation.",
    "authors": "Hilde Depauw, Norma L. Day-Vines, Hsiang-Chen Yeh, Kristy Theodore, Siqi Liu, Meng-Lin Hsieh, and Hsin-Ya Tang",
    "status": "Target: Journal of Counseling & Development.",
    "kind": "preparation"
  },
  {
    "title": "Effects of Moral Disengagement, Deindividuation, and Reduced Self-Control on the Linguistic Features of Hate Speech within Social Media.",
    "authors": "Hsiang-Chen Yeh and Chien Huang",
    "status": "National Science and Technology Council final research report (Taiwan, 2023).",
    "kind": "other",
    "links": [
      {
        "label": "Report",
        "href": "https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/03科技部計畫結案報告.pdf"
      }
    ]
  },
  {
    "title": "Linguistic Inquiry as a Tool for Measuring Therapeutic Outcomes: A Literature Review.",
    "authors": "Hsiang-Chen Yeh, Julia Patch, and Tamar Rodney",
    "status": "Literature review and conceptual framework for a submitted NIH R21 grant application.",
    "kind": "other"
  }
];
