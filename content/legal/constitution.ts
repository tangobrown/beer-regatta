import type { LegalContent } from "@/components/LegalPage";

export const constitution: LegalContent = {
  eyebrow: "Beer Regatta",
  title: "Beer Regatta Constitution",
  sections: [
    {
      heading: "Name",
      blocks: [{ p: ["The un-incorporated Association name is Beer Regatta."] }],
    },
    {
      heading: "Purposes",
      blocks: [
        { p: ["The purposes of the Association are:"] },
        {
          p: [
            "To stage a well-planned Beer Regatta Week annually in August with proper regard for the safety and well-being of participants, supporters and event organisers.",
            { br: true },
            "To ensure sufficient income and volunteer support is available each year to prepare and put on an effective Regatta Week and to sustain Regatta in perpetuity.",
          ],
        },
      ],
    },
    {
      heading: "Carrying Out the Purposes",
      blocks: [
        { p: ["In order to stage and sustain Regatta, the Association has the power to:"] },
        {
          p: [
            "Raise funds, receive grants and donations.",
            { br: true },
            "Apply funds to carry out the work of the Association.",
            { br: true },
            "Co-operate with and support other Beer village associations, organisations and charities as required to deliver Regatta.",
          ],
        },
      ],
    },
    {
      heading: "The Committee",
      blocks: [
        {
          p: [
            "The Beer Regatta Association will be managed by a Committee. The permanent elected officers are the Chair, Vice Chair, Treasurer, Secretary and Chair of the Finance Sub-Committee (FSC). Other activity and event organisers in support of Regatta join the permanent officers to form the Committee at each meeting.",
          ],
        },
        {
          p: ["The Committee may make reasonable additional rules to help the Association if required."],
        },
      ],
    },
    {
      heading: "Committee Meetings",
      blocks: [
        {
          p: [
            "Management of Beer Regatta is carried out by regular meetings set by the Chairperson. The Committee must hold at least 6 meetings each year.",
          ],
        },
        {
          p: [
            "An agenda should be issued prior to each meeting and minutes taken and issued to Committee Members. Minutes may be requested by non-committee members.",
          ],
        },
        {
          p: [
            "There must be at least one half of the elected members of the Committee present at any meeting.",
          ],
        },
        {
          p: [
            "Decisions on the Regatta events and the timetable for the week are made by the Committee; individual event decisions may be taken by event leaders, other than significant changes which may require Chair or Committee approval.",
          ],
        },
        {
          p: [
            "Every Committee Member has one vote with the Chair holding a casting vote if required. Non-elected Committee Members must have attended at least three meetings from the previous six in order to have voting status. If a Committee Member has a conflict of interest, they must declare it and withdraw from the vote as necessary.",
          ],
        },
      ],
    },
    {
      heading: "Annual General Meeting (AGM)",
      blocks: [
        {
          p: [
            "The AGM must be held every year, usually within the first quarter of the year following Regatta Week. An agenda for the AGM must be issued at least 1 week prior to the AGM. Minutes must be kept.",
          ],
        },
        {
          p: [
            "The Chair, Vice Chair, Treasurer and Secretary and Finance Sub Committee Chair are elected at each AGM. Any local resident may stand to become an elected Committee member.",
          ],
        },
        {
          p: [
            "The Treasurer will present Annual Accounts to the AGM and an auditor should be appointed at that meeting.",
          ],
        },
      ],
    },
    {
      heading: "Money and Property",
      blocks: [
        { p: ["Money and property must only be used for the Associations purposes."] },
        {
          p: [
            "Money must be held in the Association's account(s). All cheques must be signed by the Treasurer and one other Committee Member, usually Chair, Vice Chair or Secretary, in accordance with the bank account(s) requirements.",
          ],
        },
        {
          p: [
            "Committee members cannot receive monies from the Association other than to refund reasonable out of pocket expenses.",
          ],
        },
        {
          p: [
            "The Association has the power to distribute grants from any surplus funds to Beer village associations, organisations, charities, and projects subject to the approval of the Finance Sub Committee (FSC).",
          ],
        },
      ],
    },
    {
      heading: "Data Protection",
      blocks: [
        {
          p: [
            "Personal data may be held by the Secretary and other Officers in line with the Association's ",
            { link: { text: "Data Privacy Policy", href: "/privacy-policy" } },
            ".",
          ],
        },
      ],
    },
  ],
};
