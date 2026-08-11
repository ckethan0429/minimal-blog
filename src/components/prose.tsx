import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/components/mdx-components";

type ProseProps = {
  code: string;
};

export function Prose({ code }: ProseProps) {
  return (
    <div className="prose-custom">
      <MDXContent code={code} components={mdxComponents} />
    </div>
  );
}
