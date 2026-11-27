# Quran text verification (Masbahati v6.0)
Primary: Tanzil Quran Text, Uthmani v1.1 (tanzil.net), CC BY 3.0, verbatim (not changed). Attribution is shown in the reader and in TANZIL-LICENSE.txt.
Second source: King Fahd Complex (KFGQPC) Hafs text, via Quran.com API field text_qpc_hafs (independent encoding/typesetting lineage).
Checks run 2026-11-27:
- 6236 verses in both, same verse keys; per-surah ayah counts match the 114 surah metadata.
- Madani 604-page map: Tanzil page starts vs Quran.com page assignment, 0 mismatches over 6236 verses.
- Letter skeleton (diacritics, marks, alef/ya variants removed): 7 of 6236 verses differ. 2 are the bismillah prefix Tanzil attaches to 95:1 and 97:1 (removed from the verse, shown as the standard header). 5 are rasm/spacing/hamza conventions needing human review: 2:72, 15:7, 17:7, 27:20, 36:22.
- Full diacritics: encodings differ systematically (sukun, tanween and small-letter code points), so byte comparison is not meaningful; diacritics are not independently verified beyond the Tanzil project's own verification.
- Data quirk found: in the downloaded Tanzil file, 95:1 and 97:1 carry a bismillah with a stray shadda on the ba. That prefix is dropped; header uses the clean 1:1 text.
- Display change only: bismillah prefix removed from verse 1 of surahs 2-114 (except 9) and shown once as the surah header; no letter of any verse was altered.
A knowledgeable human (hafiz/teacher) review of the final text is recommended.
