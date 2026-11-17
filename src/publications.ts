export type PubKind = 'published' | 'review' | 'preparation';
export type Publication = {
  title: string;
  authors: string;
  venue: string;
  note?: string;
  kind: PubKind;
  type?: 'paper' | 'report' | 'poster';
  links?: { label: string; href: string }[];
  highlight?: string;
  coSecond?: boolean;
  figure?: { src: string; alt: string; caption: string; width: number; height: number };
};

export const publications: Publication[] = [
  {
    title: 'Disentangling the Interpretive and Predictive Roles of LIWC: Controlled Substitution in Depression-Related Classification',
    authors: 'Hsiang-Chen Yeh, Xiutian Zhao, Aurosweta Mahapatra, Shreeram Suresh Chandra, Ryan L. Boyd, and Berrak Sisman',
    venue: 'EMNLP 2026',
    note: 'Main Conference, pp. 35037–35057',
    kind: 'published',
    type: 'paper',
    links: [
      { label: 'Paper', href: 'https://aclanthology.org/2026.emnlp-main.1535/' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2607.22952' },
      { label: 'Code', href: 'https://github.com/jen900704/liwc-controlled-substitution' },
    ],
    highlight: 'Controlled substitutions test whether LIWC adds predictive value beyond existing speech and language representations, across two English and three Chinese corpora.',
    figure: {
      src: 'research/emnlp-figure.png',
      alt: 'Four LIWC conditions: intact, PCA-rotated, participant-shuffled, and random-marginal, with the properties preserved by each control.',
      caption: 'Controlled substitution design',
      width: 860,
      height: 984,
    },
  },
  {
    title: 'Who is Speaking or Who is Depressed? A Controlled Study of Speaker Leakage in Speech-Based Depression Detection',
    authors: 'Hsiang-Chen Yeh, Luqi Sun, Aurosweta Mahapatra, Shreeram Suresh Chandra, Emily Mower Provost, and Berrak Sisman',
    venue: 'Interspeech 2026',
    kind: 'published',
    type: 'paper',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2604.14354' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2604.14354' },
      { label: 'Code', href: 'https://github.com/jen900704/Speech-Depression-Speaker-Leakage' },
    ],
    highlight: 'Holding training size fixed shows how much of a depression detector’s accuracy comes from having heard the test speakers before.',
    figure: {
      src: 'research/interspeech-figure.png',
      alt: 'Size-matched speaker-independent and speaker-overlapped training sets evaluated on the same test speakers.',
      caption: 'Size-matched speaker-overlap control',
      width: 736,
      height: 552,
    },
  },
  {
    title: 'Scam-Based Human Trafficking Through a Trauma-Informed and Intersectional Lens: An Integrative Narrative Review',
    authors: 'Hsiang-Chen Yeh, Siqi Liu, and Tamar Rodney',
    venue: 'Trauma, Violence, & Abuse',
    note: '2026 · Ranked #1 in Social Work by 2024 Journal Impact Factor',
    kind: 'published',
    type: 'paper',
    links: [{ label: 'DOI', href: 'https://doi.org/10.1177/15248380261487139' }],
  },
  {
    title: 'Effects of Moral Disengagement, Deindividuation, and Reduced Self-Control on the Linguistic Features of Hate Speech within Social Media',
    authors: 'Hsiang-Chen Yeh and Chien Huang',
    venue: 'NSTC Final Research Report',
    note: 'National Science and Technology Council, Taiwan, 2023 · Competitive grant; student PI',
    kind: 'published',
    type: 'report',
    links: [{ label: 'Report', href: 'https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/03科技部計畫結案報告.pdf' }],
  },
  {
    title: 'Linguistic Features of Prosocial Lying: A Computerized Text Analysis',
    authors: 'Yueh-Che Hsieh, Hsiang-Chen Yeh, Chou-Ying Chen, and Chien Huang',
    venue: 'TACP 2023',
    note: 'Peer-reviewed poster, Taiwan Association of Clinical Psychology Annual Conference',
    kind: 'published',
    type: 'poster',
    links: [{ label: 'Poster', href: 'https://huggingface.co/datasets/jen900704/portfolio-assets/resolve/main/reports/04以電腦化字詞分析探討利社會說謊語言風格.pdf' }],
  },
  {
    title: 'Word-Aligned Prosody Reflects Speaker Differences More Than Depression or PTSD Severity',
    authors: 'Hsiang-Chen Yeh, Aurosweta Mahapatra, Shreeram Suresh Chandra, Ryan L. Boyd, and Berrak Sisman',
    venue: 'ICASSP 2027',
    note: 'Under review · arXiv:2610.15181',
    kind: 'review',
    type: 'paper',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2610.15181' },
      { label: 'Code', href: 'https://github.com/jen900704/word-aligned-prosody' },
    ],
    highlight: 'Averaged over many words, prosody gives stable speaker-level scores, but these scores do not detectably track depression or PTSD severity.',
  },
  {
    title: 'An Investigation of the Relationship Between Mental Health Providers’ Identity Management Strategies About Privilege and Self-Reported Broaching Attitudes and Behaviors',
    authors: 'Hilde Depauw, Hsiang-Chen Yeh, Norma L. Day-Vines, Kristy Theodore, Hsin-Ya Tang, Siqi Liu, and Meng-Lin Hsieh',
    venue: 'Journal of Counseling & Development',
    note: 'Under review',
    kind: 'review',
    type: 'paper',
  },
  {
    title: 'When Memories Become Visible: Externalizing Music-Evoked Autobiographical Memories with Generative AI',
    authors: 'Yancheng Cao, Jingyi Chen, Hsiang-Chen Yeh, Ruonan Fan, Anlan Wang, and Jiangtao Gong',
    venue: 'CHI 2027',
    note: 'Under review',
    kind: 'review',
    type: 'paper',
    coSecond: true,
  },
  {
    title: 'Does a Speech Depression Model Respond to the Voice or to the Words? Evidence from Edited Audio',
    authors: 'Hsiang-Chen Yeh, Shreeram Suresh Chandra, and Berrak Sisman',
    venue: 'In preparation',
    kind: 'preparation',
  },
  {
    title: 'WhiSPA v2: A Small Speech-and-Transcript Model for Within-Person Mental Health Measurement',
    authors: 'Hsiang-Chen Yeh and H. Andrew Schwartz',
    venue: 'In preparation',
    kind: 'preparation',
  },
  {
    title: 'Attribution in the Wild: A Large-Scale Computational Analysis of Everyday Causal Explanation',
    authors: 'Hsiang-Chen Yeh, Adam K. Fetterman, and Ryan L. Boyd',
    venue: 'In preparation',
    kind: 'preparation',
  },
  {
    title: 'Onset Timing, Diagnostic Delay, and Narrative Language in Adults With Self-Reported Borderline Personality Disorder',
    authors: 'Hsiang-Chen Yeh, Allison Lahnala, and Vasudha Varadarajan',
    venue: 'In preparation',
    kind: 'preparation',
  },
  {
    title: 'ShapeKit for Label-Free Failure Triage in Complex Organ Segmentation',
    authors: 'Koushik Swarna, Wenxuan Li, Hsiang-Chen Yeh, and Zongwei Zhou',
    venue: 'In preparation',
    kind: 'preparation',
  },
];
