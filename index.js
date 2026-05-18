import { useState } from "react";
      data: buffer,
      disableWorker: true
    }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map(i => i.str).join(" ") + "\n";
    }

    return fullText;
  };

  const analyze = (text) => {
    return {
      short_term: /3개월|90일|최근/.test(text) && /입원|수술/.test(text),
      long_term: /5년/.test(text) && /입원|수술/.test(text),
      diseases: {
        cancer: /암/.test(text),
        heart: /심근경색|협심증/.test(text),
        brain: /뇌졸중|뇌출혈|뇌경색/.test(text)
      },
      risk: /암|심근경색|뇌졸중/.test(text) ? "HIGH" : "LOW"
    };
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const extracted = await extractTextFromPdf(file);
    setText(extracted);
    setResult(analyze(extracted));

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>보험 심사용 PDF 분석기</h1>

      <input type="file" accept="application/pdf" onChange={handleFile} />

      {loading && <p>분석 중...</p>}

      {result && (
        <pre style={{ marginTop: 20, background: "#f4f4f4", padding: 10 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      <details>
        <summary>추출 텍스트</summary>
        <pre>{text}</pre>
      </details>
    </div>
  );
}
