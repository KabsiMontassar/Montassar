import { Box, Button, Text, Flex } from '@chakra-ui/react';
import SplitText from './UI/SplitText/SplitText';
import { useTranslation } from 'react-i18next';
import FlowingMenu from './UI/flowingMenu/FlowingMenu';
import {
  FaReact,
  SiTypescript,
  SiNestjs,
  SiMongodb,
  BiLogoPostgresql,
  SiAnsible,
  FaDocker,
  SiKubernetes,
  VscAzure,
  SiPytorch,
  SiTensorflow,
  BiLogoSpringBoot,
  SiNextdotjs,
  FaAngular,
  FaNodeJs,
  IoLogoFirebase,
  GrMysql,
  DiRedis,
  FaJenkins,
  FaGitlab,
  SiHuggingface
} from './UI/icons.js';


const Skills = () => {
  const { t, i18n } = useTranslation();



  const skillSections = [
    {

      text: t('skills.webDevelopment'),
      technologies: [
        { name: 'React', icon: FaReact },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'Angular', icon: FaAngular }
      ]
    },
    {
      text: t('skills.backendDevelopment'),
      technologies: [
        { name: 'NestJS', icon: SiNestjs },
        { name: 'Spring Boot', icon: BiLogoSpringBoot },
        { name: 'Node.js', icon: FaNodeJs }
      ]
    },
    {

      text: t('skills.databases'),
      technologies: [
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'PostgreSQL', icon: BiLogoPostgresql },
        { name: 'Firebase', icon: IoLogoFirebase },
        { name: 'MySQL', icon: GrMysql },
        { name: 'Redis', icon: DiRedis }
      ]
    },
    {
      text: t('skills.cloudDevOps'),
      technologies: [
        { name: 'Docker', icon: FaDocker },
        { name: 'Kubernetes', icon: SiKubernetes },
        { name: 'Ansible', icon: SiAnsible },
        { name: 'Azure', icon: VscAzure },
        { name: 'GitLab', icon: FaGitlab },
        { name: 'Jenkins', icon: FaJenkins }
      ]
    },
    {

      text: t('skills.aiMl'),
      technologies: [
        { name: 'PyTorch', icon: SiPytorch },
        { name: 'TensorFlow', icon: SiTensorflow },
        { name: 'Hugging Face', icon: SiHuggingface }
      ]
    }
  ];

  return (
    <Box
      id="services"
      minH="100vh"
      bg="black"
      pt={{ base: "60px", sm: "70px", md: "80px", lg: "100px" }}
    >
      <Box w="100%" pb={{ base: "40px", sm: "50px", md: "60px", lg: "80px" }}
        display="flex" justifyContent="center">
        <SplitText
          key={`services-title-${i18n.language}`}
          text={t('skills.skillsTitle')}
        />
      </Box>
      <Flex justify="center" align="center">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <FlowingMenu items={skillSections} />
        </div>
      </Flex>
    </Box>
  );
};

export default Skills;